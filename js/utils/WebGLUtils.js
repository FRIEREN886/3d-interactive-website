/**
 * WebGL Utilities
 * Helper functions for WebGL rendering and shader management
 */

import * as THREE from 'three';

export class WebGLUtils {
    /**
     * Check if WebGL is supported in the browser
     * @returns {Object} Object with support status and version
     */
    static checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            const gl2 = canvas.getContext('webgl2');
            
            return {
                supported: !!gl,
                webgl2: !!gl2,
                version: gl2 ? 2 : (gl ? 1 : 0)
            };
        } catch (e) {
            return {
                supported: false,
                webgl2: false,
                version: 0
            };
        }
    }
    
    /**
     * Get WebGL renderer capabilities
     * @param {THREE.WebGLRenderer} renderer
     * @returns {Object} Renderer capabilities
     */
    static getRendererCapabilities(renderer) {
        const gl = renderer.getContext();
        const capabilities = renderer.capabilities;
        
        return {
            maxTextureSize: capabilities.maxTextureSize,
            maxCubemapSize: capabilities.maxCubemapSize,
            maxAnisotropy: capabilities.getMaxAnisotropy(),
            precision: capabilities.precision,
            vertexTextures: capabilities.vertexTextures,
            floatTextures: capabilities.floatTextures,
            maxAttributes: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
            maxVaryingVectors: gl.getParameter(gl.MAX_VARYING_VECTORS),
            maxFragmentUniforms: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
            maxVertexUniforms: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS)
        };
    }
    
    /**
     * Create a custom shader material with WebGL GLSL shaders
     * @param {Object} shaderConfig Shader configuration
     * @returns {THREE.ShaderMaterial} Shader material
     */
    static createShaderMaterial(shaderConfig) {
        const {
            vertexShader,
            fragmentShader,
            uniforms = {},
            transparent = false,
            blending = THREE.NormalBlending,
            side = THREE.FrontSide
        } = shaderConfig;
        
        return new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
            transparent,
            blending,
            side
        });
    }
    
    /**
     * Create uniforms for shader materials
     * @param {Object} uniformsConfig Uniforms configuration
     * @returns {Object} Uniforms object
     */
    static createUniforms(uniformsConfig) {
        const uniforms = {};
        
        for (const [key, value] of Object.entries(uniformsConfig)) {
            uniforms[key] = { value };
        }
        
        return uniforms;
    }
    
    /**
     * Update shader uniforms
     * @param {THREE.ShaderMaterial} material Shader material
     * @param {Object} updates Updates object
     */
    static updateUniforms(material, updates) {
        if (!material.uniforms) return;
        
        for (const [key, value] of Object.entries(updates)) {
            if (material.uniforms[key]) {
                material.uniforms[key].value = value;
            }
        }
    }
    
    /**
     * Create a render target for post-processing effects
     * @param {number} width Width
     * @param {number} height Height
     * @param {Object} options Options
     * @returns {THREE.WebGLRenderTarget} Render target
     */
    static createRenderTarget(width, height, options = {}) {
        return new THREE.WebGLRenderTarget(width, height, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            ...options
        });
    }
    
    /**
     * Log WebGL info to console
     * @param {THREE.WebGLRenderer} renderer
     */
    static logWebGLInfo(renderer) {
        const support = this.checkWebGLSupport();
        const capabilities = this.getRendererCapabilities(renderer);
        
        console.group('🎨 WebGL Rendering Information');
        console.log('WebGL Version:', support.version);
        console.log('WebGL 2.0 Support:', support.webgl2);
        console.log('Max Texture Size:', capabilities.maxTextureSize);
        console.log('Max Anisotropy:', capabilities.maxAnisotropy);
        console.log('Precision:', capabilities.precision);
        console.log('Vertex Textures:', capabilities.vertexTextures);
        console.log('Float Textures:', capabilities.floatTextures);
        console.groupEnd();
    }
}
