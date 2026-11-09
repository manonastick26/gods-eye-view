# Ancient structures edition

A separate local globe for monuments and paths you draw. It does not replace the earlier custom edition, and it does not listen on that edition’s port.

The original project’s code is MIT, copyright Bilawal Sidhu. This screen is a customized edition, not the original project and not affiliated with its creator. Third-party imagery and any future scan files keep their own terms.

## Windows, on this PC later

Do not run this inside `C:\Users\cnbry\AppData\Local\GodsEyeView\custom-20261108`. Unpack this edition somewhere else.

Use Node.js 24.22.2, or another Node 24 at least 24.14.0 and below 25. From the unpacked folder:

```powershell
npm ci
npm run ancient:dev
```

Open `http://127.0.0.1:4174`. Do not pass `--host`, set `HOST=0.0.0.0`, open a firewall port, or forward the port. Stop it with Ctrl+C in that window.

A built copy:

```powershell
npm run ancient:build
npm run ancient:preview
```

Preview also uses `http://127.0.0.1:4174`.

## What the globe is using

- Cesium, already in this project, with no Cesium ion token.
- Esri World Imagery, a proprietary hosted satellite picture. It is not LiDAR.
- A plain ellipsoid. That is not a terrain survey.
- Fifteen monument markers with approximate centers and UNESCO record links.
- South America LiDAR entries are links and dates only. Their points are not drawn.
- No 3D monument mesh is bundled. The CAST Machu Picchu page did not give a direct modest file URL.
- Recent discoveries are four cited research notes (Valeriana, Ocomtún, Dzibanché, Naachtun). They are not pinned. An unsourced headline is not matched to any of them.
- The Grand Canyon panel separates a park overview, named public traditions (Hopi, A:shiwi/Zuni, Hualapai, Havasupai), and the unverified 5 April 1909 newspaper story. No sacred place and no cave is marked.

Proposed alignments are saved in this browser only, plus an optional JSON download.
