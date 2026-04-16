#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
import re
from pathlib import Path
from typing import Dict, Iterable

import cloudinary
import cloudinary.uploader

SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tiff", ".svg", ".avif"}


def load_env_file(env_path: Path) -> Dict[str, str]:
    values: Dict[str, str] = {}
    if not env_path.exists():
        return values

    for line in env_path.read_text(encoding="utf-8").splitlines():
        text = line.strip()
        if not text or text.startswith("#") or "=" not in text:
            continue
        key, value = text.split("=", 1)
        values[key.strip()] = value.strip().strip('"').strip("'")

    return values


def get_setting(key: str, env_values: Dict[str, str]) -> str | None:
    return os.getenv(key) or env_values.get(key)


def configure_cloudinary(env_values: Dict[str, str]) -> None:
    cloud_name = get_setting("CLOUDINARY_CLOUD_NAME", env_values)
    api_key = get_setting("CLOUDINARY_API_KEY", env_values)
    api_secret = get_setting("CLOUDINARY_API_SECRET", env_values)

    if not (cloud_name and api_key and api_secret):
        raise RuntimeError("Missing Cloudinary config. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.")

    cloudinary.config(
        cloud_name=cloud_name,
        api_key=api_key,
        api_secret=api_secret,
        secure=True,
    )


def iter_public_images(public_dir: Path) -> Iterable[Path]:
    for path in sorted(public_dir.rglob("*")):
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS:
            yield path


def build_public_id(path: Path, public_dir: Path, folder: str) -> str:
    relative = path.relative_to(public_dir).with_suffix("")
    relative_posix = relative.as_posix().lower()
    safe = re.sub(r"[^a-z0-9/_-]+", "-", relative_posix)
    safe = re.sub(r"-{2,}", "-", safe).strip("-")
    return f"{folder}/{safe}" if safe else folder


def update_file_refs(file_path: Path, replacements: Dict[str, str]) -> int:
    content = file_path.read_text(encoding="utf-8")
    original = content

    for local_ref, cloud_url in replacements.items():
        content = content.replace(f'"{local_ref}"', f'"{cloud_url}"')
        content = content.replace(f"'{local_ref}'", f"'{cloud_url}'")

    if content != original:
        file_path.write_text(content, encoding="utf-8")

    return 0 if content == original else 1


def main() -> None:
    parser = argparse.ArgumentParser(description="Upload all public images to Cloudinary and update movie references.")
    parser.add_argument("--folder", default="cinesphere/assets", help="Cloudinary folder prefix")
    parser.add_argument("--dry-run", action="store_true", help="Show actions without uploading")
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parents[2]
    public_dir = repo_root / "public"
    env_path = repo_root / "server" / ".env"
    target_files = [
        repo_root / "src" / "data" / "movies.ts",
        repo_root / "server" / "src" / "data" / "store.js",
    ]

    if not public_dir.exists():
        raise RuntimeError(f"Public folder not found: {public_dir}")

    env_values = load_env_file(env_path)
    configure_cloudinary(env_values)

    replacements: Dict[str, str] = {}
    uploaded_count = 0

    print(f"Scanning images in: {public_dir}")
    for image_path in iter_public_images(public_dir):
        local_ref = "/" + image_path.relative_to(public_dir).as_posix()
        public_id = build_public_id(image_path, public_dir, args.folder)

        if args.dry_run:
            print(f"[dry-run] {local_ref} -> {public_id}")
            continue

        result = cloudinary.uploader.upload(
            str(image_path),
            public_id=public_id,
            overwrite=True,
            resource_type="image",
        )
        replacements[local_ref] = result["secure_url"]
        uploaded_count += 1
        print(f"Uploaded {local_ref} -> {result['secure_url']}")

    files_updated = 0
    if replacements and not args.dry_run:
        for target in target_files:
            if target.exists():
                files_updated += update_file_refs(target, replacements)
                print(f"Updated references in {target}")

    print("Done.")
    print(f"Images uploaded: {uploaded_count}")
    print(f"Files updated: {files_updated}")


if __name__ == "__main__":
    main()
