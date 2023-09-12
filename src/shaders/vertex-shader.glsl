// vertex shader

varying vec3 vNormal;
varying vec3 vPosition;

uniform float time;

void main() {
  vec3 localSpacePosition = position;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(localSpacePosition, 1.0);
  vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
  vPosition = (modelMatrix * vec4(localSpacePosition, 1.0)).xyz;
}
