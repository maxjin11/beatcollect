import * as OriginalTHREE from "three";

const THREE = { ...OriginalTHREE } as any;
THREE.PlaneBufferGeometry = OriginalTHREE.PlaneGeometry;

export default THREE;