# Custom edition

This is a public fork of [Bilawal Sidhu's God's Eye View](https://github.com/bilawalsidhu/gods-eye-view). The original MIT copyright and license in `LICENSE` are unchanged and cover the source code only. Third-party data and models keep their own terms, as that file explains.

This edition is not the original project. It is not affiliated with or endorsed by Bilawal Sidhu. The title still names the work being customized.

## What this pass changes

- The globe starts on keyless Esri imagery, with OSM if Esri cannot be reached. Google 3D Tiles and Cesium ion terrain are not loaded, and a failed free basemap does not switch to Google.
- Google place search, reverse geocoding, text search, and nearby places are not called. Coordinates, bundled places, Photon, and Nominatim (when that route is enabled) still run. A missing result is a not-found or search-failed message.
- Street Traffic draws simulated OpenStreetMap traffic until you choose **TomTom** or **Hybrid**. A saved TomTom key is not spent on the default view. The status line says simulated, and it says to choose TomTom or Hybrid when a key is already present. Live, stale, and unavailable states are unchanged once you opt in.
- The map tray has **Paid maps off**. Turning it on stores `gev-metered-providers=1` in this browser and reloads. That is the only switch that loads Google 3D and Google place search. Turning it off reloads the keyless globe. There is no purchase step in the app.
- **Save this view** keeps named coordinates in `localStorage` (`gev-favorite-locations`). They are still there after a reload. Nothing is uploaded.
- Public-camera meta lines say when a heading is estimated, when the pose is still a raw prior (`PLACEMENT ESTIMATED`), and when the feed reports a horizontal accuracy. Curated poses are not marked estimated. The source badge still says live, snapshot, loading, or unavailable. This edition does not add cameras or tracking.

## Run it on Windows

The maintainer's PC operating system was not verified here. These steps are for a later install on that PC. They were not run as an installed copy on that machine.

1. Install [Node.js 24.14.0 or later (not 25)](https://nodejs.org/) or Node.js 26.x. The project `engines` field rejects Node 25. The copy used to build this edition's checks may differ; match this range on the PC.
2. Install Git if you are cloning. A source zip can be unpacked instead.
3. In PowerShell, from the unpacked folder. Do not add `--host`, `HOST=0.0.0.0`, a firewall exception, or a port forward. `npm run dev` listens on 127.0.0.1 only, and the server exits if a launch tries to bind every interface.

```powershell
npm ci
npm run dev
```

4. Open `http://127.0.0.1:4173` in Chrome or Edge with hardware acceleration on. Leave API keys empty. That address is this PC only.

`npm run doctor` checks the local setup. `npm test` runs the project's unit tests. There is no separate TypeScript check; the app is JavaScript.

To open a build you already produced:

```powershell
npm ci
npm run build
npm run preview
```

`npm run preview` also listens on 127.0.0.1 only. Open `http://127.0.0.1:4173`.

Preview serves the `dist` folder. The dev command is the one that serves source with live reload.

Docker and Pinokio still work as in the upstream README. They are optional.

## Runtime and hardware

Upstream recorded one Apple M5 / Chrome comparison in [PERFORMANCE.md](PERFORMANCE.md). That page is a point-in-time measurement, not a minimum specification, and it does not set a GPU requirement.

What this edition actually needs:

- A 64-bit Windows 10 or 11 PC, or macOS or Linux if that is what you have. Windows is the intended install target.
- Node.js as above, only for the local server. The page itself runs in the browser.
- About 8 GB of system memory is a practical floor for the Cesium globe plus a desktop browser. The upstream capture used a little over 100 MB of JavaScript heap at idle and several hundred megabytes with heavy layers. Those numbers are not a guarantee.
- A current Chrome, Edge, or Firefox build with hardware acceleration. Integrated graphics can show the keyless satellite globe. Google 3D, which this edition leaves off, configures a tile cache of about 1.5 GiB plus 1 GiB of overflow in `src/maps/google3d.js`. Do not turn paid maps on unless you mean to use that quota and memory.
- A network connection for public map tiles and feeds. With no keys, some layers stay empty or say they need a key (NASA FIRMS, live AIS, TomTom). Earthquakes, satellites, bundled places, and the keyless globe do not need keys.
- Disk space for `node_modules` after `npm ci`, plus this source tree. On the Linux machine that produced this edition's build, `npm ci` used about 499 MB and the production `dist` folder was about 79 MB. That is not a measurement of your PC. Do not copy `node_modules` into a zip; install it on the PC.

No API key, account, card, or subscription is required to start.
