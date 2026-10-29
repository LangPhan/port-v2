export const PAGE_TURN_MS = 960;
export const PAPER_WIDTH = 430;
export const PAPER_HEIGHT = 570;
// A shallow desk camera needs less depth than a free-orbit book camera.
export const PAPER_DEPTH_SCALE = 0.55;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const smooth = (value) => value * value * (3 - 2 * value);

/**
 * A hinged chain of paper segments. The transient C curve relaxes to a flat
 * sheet at both ends; reversing the turn mirrors the bend and surface normals.
 * @param {number} progress
 * @param {"forward" | "backward"} direction
 * @param {number} segments
 */
export function paperPose(progress, direction, segments = 30) {
  const t = clamp(progress, 0, 1);
  const q = smooth(t);
  const lift = Math.sin(Math.PI * q);
  const sign = direction === "forward" ? 1 : -1;
  const bend = sign * 1.02 * lift;
  const target = -Math.PI * (direction === "forward" ? q : 1 - q);
  const root = target - bend * 0.3;
  const width = PAPER_WIDTH / segments;
  const nodes = [];
  let x = 0;
  let z = 0;
  let previousCurve = 0;
  for (let i = 0; i <= segments; i++) {
    const u = i / segments;
    const curve = bend * (0.82 * Math.sin(Math.PI * u) + 0.18 * u);
    const yaw = root + curve;
    nodes.push({
      x, z: z * PAPER_DEPTH_SCALE, yaw,
      rotationY: curve - previousCurve,
    });
    previousCurve = curve;
    x += width * Math.cos(yaw);
    z -= width * Math.sin(yaw);
  }
  const height = nodes.reduce((sum, node) => sum + node.z, 0) / nodes.length;
  return {
    progress: t, root, nodes,
    shadowOpacity: 0.31 * Math.pow(Math.max(0, lift), 0.8),
    shadowBlur: 2 + Math.max(0, height) * 0.055,
    contactOpacity: lift * 0.22,
  };
}

/** @param {number} yaw @param {boolean} back */
export function paperShade(yaw, back = false) {
  const side = back ? -1 : 1;
  const nx = Math.sin(yaw) * side;
  const nz = Math.cos(yaw) * side;
  const diffuse = Math.max(0, -0.32 * nx + 0.94 * nz);
  return clamp(0.025 + (1 - diffuse) * 0.23, 0.02, 0.29);
}

/**
 * Directional-light projection onto the flat spread, including the bowed edge.
 * @param {ReturnType<typeof paperPose>} pose
 * @param {number} anchor
 */
export function paperShadowPath(pose, anchor) {
  const project = (node, bottom) => {
    const x = anchor + node.x + node.z * 0.34;
    const y = (bottom ? PAPER_HEIGHT : 0) + node.z * 0.18;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  };
  return `M${pose.nodes.map((node) => project(node, false)).join(" L")} L${[...pose.nodes].reverse().map((node) => project(node, true)).join(" L")} Z`;
}
