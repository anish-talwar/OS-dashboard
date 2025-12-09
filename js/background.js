// Background Management & Retro Mac Patterns

class BackgroundManager {
    constructor() {
        this.currentBackground = 'classic-grid';
        this.customImageUrl = null;
        this.patterns = {}; // Cache patterns
        this.loadBackground();
    }

    loadBackground() {
        const saved = localStorage.getItem('dashboardBackground');
        const savedImage = localStorage.getItem('dashboardBackgroundImage');
        
        if (saved) {
            this.currentBackground = saved;
        }
        if (savedImage) {
            this.customImageUrl = savedImage;
        }

        this.applyBackground();
    }

    saveBackground() {
        localStorage.setItem('dashboardBackground', this.currentBackground);
        if (this.customImageUrl) {
            localStorage.setItem('dashboardBackgroundImage', this.customImageUrl);
        } else {
            localStorage.removeItem('dashboardBackgroundImage');
        }
    }

    applyBackground() {
        const body = document.body;
        
        console.log('applyBackground() called');
        console.log('Current background type:', this.currentBackground);
        
        if (this.currentBackground === 'custom' && this.customImageUrl) {
            console.log('Applying custom image');
            body.style.backgroundImage = `url('${this.customImageUrl}')`;
        } else {
            console.log('Generating pattern for:', this.currentBackground);
            const patternUrl = this.getBackgroundPattern(this.currentBackground);
            console.log('Pattern URL length:', patternUrl.length);
            body.style.backgroundImage = `url('${patternUrl}')`;
            console.log('Applied to body');
        }
        
        console.log('Final body.style.backgroundImage:', body.style.backgroundImage.substring(0, 150));
    }

    getBackgroundPattern(type) {
        // Return cached pattern if available
        if (this.patterns[type]) {
            return this.patterns[type];
        }

        let patternUrl;
        
        switch(type) {
            case 'classic-grid':
                patternUrl = this.createClassicGridPattern();
                break;
            case 'mac-weave':
                patternUrl = this.createMacWeavePattern();
                break;
            case 'mac-dots':
                patternUrl = this.createMacDotsPattern();
                break;
            case 'mac-herringbone':
                patternUrl = this.createMacHerringbonePattern();
                break;
            case 'mac-wood':
                patternUrl = this.createMacWoodPattern();
                break;
            case 'mac-leather':
                patternUrl = this.createMacLeatherPattern();
                break;
            case 'white-solid':
                patternUrl = this.createWhiteSolidPattern();
                break;
            case 'light-gray':
                patternUrl = this.createLightGrayPattern();
                break;
            case 'dark-gray':
                patternUrl = this.createDarkGrayPattern();
                break;
            default:
                patternUrl = this.createClassicGridPattern();
        }
        
        // Cache the pattern
        this.patterns[type] = patternUrl;
        return patternUrl;
    }

    // Classic Mac 1.0 Grid Pattern (most iconic)
    createClassicGridPattern() {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        
        const ctx = canvas.getContext('2d');
        
        // Light background
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, 16, 16);
        
        // Dark grid lines
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x <= 16; x += 8) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 16);
            ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= 16; y += 8) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(16, y);
            ctx.stroke();
        }
        
        return canvas.toDataURL();
    }

    // Mac Weave Pattern (diagonal threads)
    createMacWeavePattern() {
        const canvas = document.createElement('canvas');
        canvas.width = 8;
        canvas.height = 8;
        
        const ctx = canvas.getContext('2d');
        
        // Light background
        ctx.fillStyle = '#efefef';
        ctx.fillRect(0, 0, 8, 8);
        
        // Weave pattern
        ctx.fillStyle = '#d0d0d0';
        ctx.fillRect(0, 0, 4, 4);
        ctx.fillRect(4, 4, 4, 4);
        
        // Highlight
        ctx.strokeStyle = '#f0f0f0';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, 4, 4);
        ctx.strokeRect(4, 4, 4, 4);
        
        return canvas.toDataURL();
    }

    // Mac Dots Pattern (scattered pixels)
    createMacDotsPattern() {
        const canvas = document.createElement('canvas');
        canvas.width = 4;
        canvas.height = 4;
        
        const ctx = canvas.getContext('2d');
        
        // Light background
        ctx.fillStyle = '#f8f8f8';
        ctx.fillRect(0, 0, 4, 4);
        
        // Scattered dots
        ctx.fillStyle = '#d0d0d0';
        ctx.fillRect(1, 1, 1, 1);
        
        return canvas.toDataURL();
    }

    // Mac Herringbone Pattern
    createMacHerringbonePattern() {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        
        const ctx = canvas.getContext('2d');
        
        // Base color
        ctx.fillStyle = '#e8e8e8';
        ctx.fillRect(0, 0, 16, 16);
        
        // Herringbone lines
        ctx.strokeStyle = '#d0d0d0';
        ctx.lineWidth = 1;
        
        // Diagonal lines
        for (let i = 0; i < 32; i += 4) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(0, i);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(16, i - 16);
            ctx.lineTo(i, 16);
            ctx.stroke();
        }
        
        return canvas.toDataURL();
    }

    // Mac Wood Texture (horizontal stripes)
    createMacWoodPattern() {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        
        const ctx = canvas.getContext('2d');
        
        // Wood color gradient effect with lines
        ctx.fillStyle = '#d2b48c';
        ctx.fillRect(0, 0, 16, 16);
        
        // Wood grain lines
        for (let y = 0; y < 16; y += 2) {
            ctx.strokeStyle = y % 4 === 0 ? '#c19a6b' : '#daa520';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(16, y);
            ctx.stroke();
        }
        
        return canvas.toDataURL();
    }

    // Mac Leather Texture (bumpy pattern)
    createMacLeatherPattern() {
        const canvas = document.createElement('canvas');
        canvas.width = 8;
        canvas.height = 8;
        
        const ctx = canvas.getContext('2d');
        
        // Leather base
        ctx.fillStyle = '#5c4033';
        ctx.fillRect(0, 0, 8, 8);
        
        // Texture bumps
        ctx.fillStyle = '#6d4c41';
        for (let i = 0; i < 8; i += 2) {
            for (let j = 0; j < 8; j += 2) {
                if ((i + j) % 4 === 0) {
                    ctx.fillRect(i, j, 1, 1);
                }
            }
        }
        
        ctx.strokeStyle = '#4a2511';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(0, 0, 8, 8);
        
        return canvas.toDataURL();
    }

    // Solid white
    createWhiteSolidPattern() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 1, 1);
        
        return canvas.toDataURL();
    }

    // Light gray solid
    createLightGrayPattern() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(0, 0, 1, 1);
        
        return canvas.toDataURL();
    }

    // Dark gray solid
    createDarkGrayPattern() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#a0a0a0';
        ctx.fillRect(0, 0, 1, 1);
        
        return canvas.toDataURL();
    }

    setBackground(type) {
        console.log('=== setBackground called ===');
        console.log('Type:', type);
        console.log('Before - currentBackground:', this.currentBackground);
        
        this.currentBackground = type;
        this.customImageUrl = null;
        
        console.log('After - currentBackground:', this.currentBackground);
        console.log('Calling saveBackground()...');
        this.saveBackground();
        
        console.log('Calling applyBackground()...');
        this.applyBackground();
        
        console.log('Saved background:', localStorage.getItem('dashboardBackground'));
        console.log('Body background image:', document.body.style.backgroundImage.substring(0, 100));
        console.log('=== setBackground done ===');
    }

    setCustomImage(imageData) {
        console.log('Custom image set');
        this.currentBackground = 'custom';
        this.customImageUrl = imageData;
        this.saveBackground();
        this.applyBackground();
    }

    getAvailableBackgrounds() {
        return [
            { id: 'classic-grid', name: '🔲 Classic Grid (Mac 1.0)', preview: '█' },
            { id: 'mac-weave', name: '🧵 Mac Weave', preview: '▦' },
            { id: 'mac-dots', name: '⬤ Mac Dots', preview: '•' },
            { id: 'mac-herringbone', name: '⋰ Herringbone', preview: '⋰' },
            { id: 'mac-wood', name: '🪵 Wood', preview: '═' },
            { id: 'mac-leather', name: '🎒 Leather', preview: '▥' },
            { id: 'white-solid', name: '⬜ White', preview: '□' },
            { id: 'light-gray', name: '◻ Light Gray', preview: '▦' },
            { id: 'dark-gray', name: '■ Dark Gray', preview: '▪' }
        ];
    }
}

// Global instance
const backgroundManager = new BackgroundManager();
