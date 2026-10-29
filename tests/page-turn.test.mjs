import test from "node:test";
import assert from "node:assert/strict";
import { PAPER_WIDTH, PAPER_DEPTH_SCALE, paperPose, paperShade, paperShadowPath } from "../app/[lang]/components/Desk/page-turn-math.mjs";

const close = (actual, expected, tolerance = 1e-8) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} ≈ ${expected}`);

test("each turn starts and lands on the correct flat side of the spine", () => {
  for (const direction of ["forward", "backward"]) {
    for (const progress of [0, 1]) {
      const pose = paperPose(progress, direction);
      const right = direction === "forward" ? progress === 0 : progress === 1;
      close(pose.nodes.at(-1).x, right ? PAPER_WIDTH : -PAPER_WIDTH);
      for (const node of pose.nodes) {
        close(node.z, 0);
        close(node.rotationY, 0);
      }
      close(pose.shadowOpacity, 0);
      close(pose.contactOpacity, 0);
    }
  }
});

test("the raised sheet bends while every segment keeps its paper length", () => {
  for (const count of [20, 30]) {
    for (const direction of ["forward", "backward"]) {
      const pose = paperPose(0.5, direction, count);
      assert.equal(pose.nodes.length, count + 1);
      assert.ok(Math.max(...pose.nodes.map(node => node.z)) > 150);
      assert.ok(Math.abs(pose.nodes[0].yaw - pose.nodes[Math.floor(count / 2)].yaw) > 0.8);
      for (let i = 1; i <= count; i++) {
        const a = pose.nodes[i - 1], b = pose.nodes[i];
        close(Math.hypot(b.x - a.x, (b.z - a.z) / PAPER_DEPTH_SCALE), PAPER_WIDTH / count);
      }
    }
  }
});

test("backward bends mirror forward bends without reversing sheet height", () => {
  for (const progress of [0.1, 0.3, 0.5, 0.8]) {
    const forward = paperPose(progress, "forward");
    const backward = paperPose(progress, "backward");
    forward.nodes.forEach((node, i) => {
      close(backward.nodes[i].x, -node.x);
      close(backward.nodes[i].z, node.z);
    });
  }
});

test("cast shadow follows the bowed outline and softens as paper lifts", () => {
  const flat = paperPose(0, "forward");
  const raised = paperPose(0.5, "forward");
  assert.ok(raised.shadowBlur > flat.shadowBlur + 3);
  assert.ok(raised.shadowOpacity > 0.25);
  const path = paperShadowPath(raised, PAPER_WIDTH);
  assert.ok(path.startsWith(`M${PAPER_WIDTH.toFixed(2)},0.00`));
  assert.ok(path.endsWith(" Z"));
  assert.equal((path.match(/ L/g) ?? []).length, raised.nodes.length * 2 - 1);
  assert.ok(!/NaN|Infinity/.test(path));
});

test("surface light follows face normals and stays within a legible range", () => {
  close(paperShade(0), paperShade(Math.PI, true));
  assert.ok(paperShade(0) < paperShade(Math.PI));
  for (let yaw = -Math.PI; yaw <= Math.PI; yaw += 0.1) {
    for (const back of [true, false]) assert.ok(paperShade(yaw, back) >= 0.02 && paperShade(yaw, back) <= 0.29);
  }
});

test("out-of-range animation time is clamped to flat endpoints", () => {
  assert.deepEqual(paperPose(-1, "forward"), paperPose(0, "forward"));
  assert.deepEqual(paperPose(2, "backward"), paperPose(1, "backward"));
});
