function headerShader(shader) {
  shader.vertexShader =
    `
    uniform vec3 cursor;
    uniform float local_tick;
    varying float cam_depth;
    ` +
    shader.vertexShader.replace(
      '#include <fog_vertex>',
      `#include <fog_vertex>

    float angle = local_tick * 0.0001;
    
    vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
    cam_depth = distance(worldPosition.xyz, cameraPosition);

    float d = clamp(7.0 - distance(worldPosition.xyz, cursor), 0.0, 7.0) * 1.5 ;
    vec3 positionOnSphere = transformed;
    if(gl_VertexID % 2 == 0){
        d = clamp(d, 1.0, 5.0);
        float radius = 1.0 * rand(vec2(gl_VertexID, 30)) * d;

        float azimuth = 2.0 * 3.14159265359 * rand(vec2(gl_VertexID, 1)) * angle * 0.5;
        float zenith = 3.14159265359 * rand(vec2(1, gl_VertexID)) * (angle * 0.3);

        positionOnSphere = vec3(
            transformed.x + radius * sin(zenith) * cos(azimuth),
            transformed.y + radius * sin(zenith) * sin(azimuth),
            transformed.z + radius * cos(zenith)
        );
    } else {
        if(d > 0.0) {
            float radius = 1.0 * rand(vec2(gl_VertexID, 30)) * d;

            float azimuth = 2.0 * 3.14159265359 * rand(vec2(gl_VertexID, 1)) * angle * 0.5;
            float zenith = 3.14159265359 * rand(vec2(1, gl_VertexID)) * (angle * 0.3);

            positionOnSphere = vec3(
                transformed.x + radius * sin(zenith) * cos(azimuth) * rand(vec2(gl_VertexID, 30))*2.0,
                transformed.y + radius * sin(zenith) * sin(azimuth) * rand(vec2(gl_VertexID, 30))*2.0,
                transformed.z + radius * cos(zenith) * rand(vec2(gl_VertexID, 30))*2.0
            );
        }
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(positionOnSphere, 1);                
    `
    );

  shader.fragmentShader =
    `
    uniform float min_distance;
    uniform float max_distance;
    varying float cam_depth;
    ` +
    shader.fragmentShader.replace(
      '#include <premultiplied_alpha_fragment>',
      `#include <premultiplied_alpha_fragment>
    
    float fill = 1.0;
    if (cam_depth > min_distance) {
        fill = 1.0 - ((cam_depth - min_distance) / (max_distance - min_distance));
        fill = clamp(fill, 0.0, 1.0);                    
    }

    vec3 color = mix(vec3(0.,0.216,0.376), vec3(1.0, 1.0, 1.0), fill);

    gl_FragColor = vec4(color, 1.0);
    gl_FragColor *= texture2D( map, gl_PointCoord );        

    `
    );
}

export { headerShader };
