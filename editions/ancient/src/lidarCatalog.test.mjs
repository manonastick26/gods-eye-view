import assert from 'node:assert/strict';
import test from 'node:test';
import {
  SOUTH_AMERICA_LIDAR,
  describeLidarCatalog,
  lidarRecordErrors,
  modelLoadPlan,
  modelNoteFor,
} from './lidarCatalog.js';
import { safeSourceUrl } from './content.js';

test('South America LiDAR rows are links, not rendered scans', () => {
  const summary = describeLidarCatalog();
  assert.equal(summary.status, 'linked');
  assert.equal(summary.rendered, false);
  assert.equal(summary.count, SOUTH_AMERICA_LIDAR.length);
  for (const record of SOUTH_AMERICA_LIDAR) {
    assert.deepEqual(lidarRecordErrors(record), []);
    assert.equal(record.rendered, false);
    assert.equal(record.siteAssociation, 'none');
    assert.equal(safeSourceUrl(record.url), record.url);
  }
  const sao = SOUTH_AMERICA_LIDAR.find((record) => record.id === 'pmsp-2017');
  assert.match(sao.resolutionNote, /not Cesium 3D Tiles/);
  assert.equal(sao.publicationDate, null);
  const eba = SOUTH_AMERICA_LIDAR.find((record) => record.id === 'eba-transect-outlines');
  assert.equal(eba.publicationDate, '2021-06-16');
  assert.notEqual(eba.acquisitionStart, eba.publicationDate);
});

test('generic terrain and missing models are not scans of a building', () => {
  assert.ok(
    lidarRecordErrors({
      kind: 'not-lidar-terrain',
      status: 'available',
      rendered: false,
    }).some((error) => /Generic terrain/.test(error)),
  );
  assert.equal(modelLoadPlan({ status: 'unavailable' }).action, 'none');
  assert.equal(
    modelLoadPlan({
      status: 'hypothetical-reconstruction',
      url: 'https://example.com/box.glb',
      format: 'gltf',
    }).action,
    'none',
  );
  assert.equal(
    modelLoadPlan({
      status: 'scan-derived',
      format: 'copc',
      url: 'https://example.com/cloud.copc.laz',
      license: 'CC BY 4.0',
      source: 'example',
    }).action,
    'none',
  );
  assert.match(modelNoteFor('machu-picchu').note, /No mesh was downloaded/);
  assert.equal(modelNoteFor('machu-picchu').rendered, false);
  assert.equal(modelNoteFor('stonehenge'), null);
});
