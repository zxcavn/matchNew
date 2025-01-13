export const FRAGMENT_SHADER = `
            precision highp float;

            uniform vec3 baseColor;
                uniform sampler2D map;

                varying vec3 vColor;
                varying float vAlpha;

                void main() {
                    gl_FragColor = vec4( baseColor * vColor, vAlpha );
                    gl_FragColor *= texture2D( map, gl_PointCoord );        
                }
            `;

export const DOT_ICON_SHADERS = `
                precision highp float;

                attribute float time;
                uniform float globalTime;

                varying vec3 vColor;
                varying float vAlpha;

                void main() {

                    vColor = color;

                    vec3 pos = position; 

                    // time
                    float localTime = time + globalTime;
                    float f = fract( localTime );
                    float accTime = f * f;

                    // animation
                    float angle = accTime * 40.0;
                    vec2 pulse = vec2( sin( angle ) * 10.0, cos( angle ) * 15.0 );
                    vec3 animated = vec3( pos.x * accTime + pulse.x, pos.y * accTime + pulse.y, pos.z * accTime * 1.75 );
                    vAlpha = ( 1.0 - f ) * 2.0;

                    vec4 mvPosition = modelViewMatrix * vec4( animated, 1.0 );
                    
                    gl_Position = projectionMatrix * mvPosition;`;

export const DOT_ICON_SHADERS_POINT_SIZE_DESKTOP = `
precision highp float;

gl_PointSize = min(70.0, (accTime * 100.0 ) * ( 180.0 / length( mvPosition.xyz ) ) ); 
}`;
export const DOT_ICON_SHADERS_POINT_SIZE_MOBILE = `
precision highp float;

gl_PointSize = min( 100.0, (accTime * 130.0 ) * ( 200.0 / length( mvPosition.xyz ) ) ); 
}`;
export const COLOR_ICON_SHADERS = `
                precision highp float;

                attribute float time;
                uniform float globalTime;

                varying vec3 vColor;
                varying float vAlpha;

                void main() {

                    vColor = color;

                    vec3 pos = position; 

                    // time
                    float localTime = time + globalTime;
                    float f = fract( localTime );
                    float accTime = f * f;

                    // animation
                    float angle = accTime * 40.0;
                    vec2 pulse = vec2( sin( angle ) * 5.0, cos( angle ) * 3.0 );
                    vAlpha = (1.0 - f ) * 2.0;

                    vec3 animated = vec3( pos.x * accTime + pulse.x, pos.y * accTime + pulse.y, pos.z * accTime * 1.75 );                    
                    vec4 mvPosition = modelViewMatrix * vec4(animated, 1.1 );
                     gl_Position = projectionMatrix * mvPosition;`;

export const COLOR_ICON_SHADERS_POINT_SIZE_DESKTOP = `
precision highp float;

gl_PointSize = min( 70.0, ( accTime * 130.0 ) * ( 550.0 / length( mvPosition.xyz ) ) );
}`;
export const COLOR_ICON_SHADERS_POINT_SIZE_MOBILE = `
precision highp float;

gl_PointSize = min( 90.0, ( accTime * 150.0 ) 
* ( 700.0 / length( mvPosition.xyz ) ) );
}`;
