# Photo Memories Folder

Place any photos you want to show in the memory book here.

## How to use:
1. Copy your photos (e.g., `.jpg`, `.png`, `.webp`) into this folder:
   `happy birthday/artifacts/birthday/public/images/`
2. Open `src/config.ts` and set the `photo` field for your memories. E.g.:
   ```typescript
   memories: [
     { photo: "/images/your_photo_name.jpg", caption: "Caption goes here" },
     ...
   ]
   ```
