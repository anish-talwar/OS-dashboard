// Control Panels - System Preferences Manager
class ControlPanels {
    constructor() {
        this.preferences = {
            appearance: {
                theme: 'light',
                accentColor: '#000080',
                fontSize: '12',
                windowStyle: 'system7'
            },
            sounds: {
                enabled: true,
                masterVolume: 50,
                alertSound: 'beep',
                soundEffects: true,
                systemSounds: true
            }
        };
        this.loadPreferences();
    }

    init() {
        this.setupEventListeners();
        this.applyPreferences();
        this.makeWindowDraggable();
    }

    setupEventListeners() {
        // Appearance settings
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                this.preferences.appearance.theme = e.target.value;
                this.applyTheme();
                this.savePreferences();
            });
        }

        const accentColorInput = document.getElementById('accentColorInput');
        if (accentColorInput) {
            accentColorInput.addEventListener('change', (e) => {
                this.preferences.appearance.accentColor = e.target.value;
                this.applyAccentColor();
                this.savePreferences();
            });
        }

        const fontSizeSelect = document.getElementById('fontSizeSelect');
        if (fontSizeSelect) {
            fontSizeSelect.addEventListener('change', (e) => {
                this.preferences.appearance.fontSize = e.target.value;
                this.applyFontSize();
                this.savePreferences();
            });
        }

        // Sound settings
        const soundToggle = document.getElementById('soundToggle');
        if (soundToggle) {
            soundToggle.addEventListener('change', (e) => {
                this.preferences.sounds.enabled = e.checked;
                this.updateSoundControls();
                this.savePreferences();
            });
        }

        const masterVolumeSlider = document.getElementById('masterVolumeSlider');
        if (masterVolumeSlider) {
            masterVolumeSlider.addEventListener('input', (e) => {
                this.preferences.sounds.masterVolume = parseInt(e.target.value);
                const volumeValue = document.getElementById('volumeValue');
                if (volumeValue) {
                    volumeValue.textContent = e.target.value + '%';
                }
                this.savePreferences();
            });
        }

        const alertSoundSelect = document.getElementById('alertSoundSelect');
        if (alertSoundSelect) {
            alertSoundSelect.addEventListener('change', (e) => {
                this.preferences.sounds.alertSound = e.target.value;
                this.savePreferences();
            });
        }

        const soundEffectsToggle = document.getElementById('soundEffectsToggle');
        if (soundEffectsToggle) {
            soundEffectsToggle.addEventListener('change', (e) => {
                this.preferences.sounds.soundEffects = e.checked;
                this.savePreferences();
            });
        }

        const systemSoundsToggle = document.getElementById('systemSoundsToggle');
        if (systemSoundsToggle) {
            systemSoundsToggle.addEventListener('change', (e) => {
                this.preferences.sounds.systemSounds = e.checked;
                this.savePreferences();
            });
        }

        // Test button
        const testSoundBtn = document.getElementById('testSoundBtn');
        if (testSoundBtn) {
            testSoundBtn.addEventListener('click', () => {
                this.playTestSound();
            });
        }

        // Reset button
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetPreferences();
            });
        }
    }

    makeWindowDraggable() {
        const windowEl = document.getElementById('controlPanelWindow');
        if (!windowEl) return;

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = windowEl.querySelector('.window-header');

        if (!header) return;

        header.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            if (e.target.closest('.window-controls')) return;

            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            windowEl.classList.add('dragging');
        }

        function elementDrag(e) {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            let newTop = windowEl.offsetTop - pos2;
            let newLeft = windowEl.offsetLeft - pos1;

            const desktopArea = document.querySelector('.desktop-area');
            if (desktopArea) {
                newTop = Math.max(20, Math.min(newTop, desktopArea.offsetHeight - windowEl.offsetHeight));
                newLeft = Math.max(0, Math.min(newLeft, desktopArea.offsetWidth - windowEl.offsetWidth));
            }

            windowEl.style.top = newTop + 'px';
            windowEl.style.left = newLeft + 'px';
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            windowEl.classList.remove('dragging');
        }
    }

    applyTheme() {
        const root = document.documentElement;
        const theme = this.preferences.appearance.theme;

        if (theme === 'dark') {
            root.style.setProperty('--color-bg', '#1a1a1a');
            root.style.setProperty('--color-fg', '#ffffff');
            root.style.setProperty('--color-window-bg', '#2a2a2a');
            root.style.setProperty('--color-window-border', '#444444');
            document.body.style.backgroundColor = '#1a1a1a';
        } else {
            root.style.setProperty('--color-bg', '#f5f5f5');
            root.style.setProperty('--color-fg', '#000000');
            root.style.setProperty('--color-window-bg', '#c0c0c0');
            root.style.setProperty('--color-window-border', '#000000');
            document.body.style.backgroundColor = '#f5f5f5';
        }
    }

    applyAccentColor() {
        const root = document.documentElement;
        root.style.setProperty('--accent-primary', this.preferences.appearance.accentColor);
    }

    applyFontSize() {
        const root = document.documentElement;
        const fontSize = this.preferences.appearance.fontSize;
        // Update the CSS custom property on the root element
        root.style.setProperty('--font-size-base', fontSize + 'px');
        // Also update body directly for redundancy
        document.body.style.fontSize = fontSize + 'px';
    }

    playTestSound() {
        if (!this.preferences.sounds.enabled) {
            alert('Sound is disabled');
            return;
        }

        const sounds = {
            'beep': () => this.generateBeep(),
            'chime': () => this.generateChime(),
            'pop': () => this.generatePop(),
            'click': () => this.generateClick()
        };

        const soundFn = sounds[this.preferences.sounds.alertSound];
        if (soundFn) {
            try {
                soundFn();
            } catch (e) {
                console.error('Audio context error:', e);
            }
        }
    }

    generateBeep() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            const volume = this.preferences.sounds.masterVolume / 100;
            gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            console.error('Beep generation error:', e);
        }
    }

    generateChime() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const notes = [523.25, 659.25, 783.99]; // C, E, G

            notes.forEach((freq, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.frequency.value = freq;
                oscillator.type = 'sine';

                const volume = this.preferences.sounds.masterVolume / 100;
                const startTime = audioContext.currentTime + (index * 0.1);
                gainNode.gain.setValueAtTime(volume * 0.2, startTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

                oscillator.start(startTime);
                oscillator.stop(startTime + 0.15);
            });
        } catch (e) {
            console.error('Chime generation error:', e);
        }
    }

    generatePop() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.1);
            oscillator.type = 'sine';

            const volume = this.preferences.sounds.masterVolume / 100;
            gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            console.error('Pop generation error:', e);
        }
    }

    generateClick() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const bufferSize = audioContext.sampleRate * 0.05;
            const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
            }

            const source = audioContext.createBufferSource();
            source.buffer = buffer;

            const gainNode = audioContext.createGain();
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);

            const volume = this.preferences.sounds.masterVolume / 100;
            gainNode.gain.setValueAtTime(volume * 0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

            source.start(audioContext.currentTime);
        } catch (e) {
            console.error('Click generation error:', e);
        }
    }

    updateSoundControls() {
        const controls = document.querySelectorAll('#masterVolumeSlider, #alertSoundSelect, #soundEffectsToggle, #systemSoundsToggle, #testSoundBtn');
        controls.forEach(control => {
            control.disabled = !this.preferences.sounds.enabled;
        });
    }

    applyPreferences() {
        // Update UI elements
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) themeSelect.value = this.preferences.appearance.theme;

        const accentColorInput = document.getElementById('accentColorInput');
        if (accentColorInput) accentColorInput.value = this.preferences.appearance.accentColor;

        const fontSizeSelect = document.getElementById('fontSizeSelect');
        if (fontSizeSelect) fontSizeSelect.value = this.preferences.appearance.fontSize;

        const soundToggle = document.getElementById('soundToggle');
        if (soundToggle) soundToggle.checked = this.preferences.sounds.enabled;

        const masterVolumeSlider = document.getElementById('masterVolumeSlider');
        if (masterVolumeSlider) masterVolumeSlider.value = this.preferences.sounds.masterVolume;

        const volumeValue = document.getElementById('volumeValue');
        if (volumeValue) volumeValue.textContent = this.preferences.sounds.masterVolume + '%';

        const alertSoundSelect = document.getElementById('alertSoundSelect');
        if (alertSoundSelect) alertSoundSelect.value = this.preferences.sounds.alertSound;

        const soundEffectsToggle = document.getElementById('soundEffectsToggle');
        if (soundEffectsToggle) soundEffectsToggle.checked = this.preferences.sounds.soundEffects;

        const systemSoundsToggle = document.getElementById('systemSoundsToggle');
        if (systemSoundsToggle) systemSoundsToggle.checked = this.preferences.sounds.systemSounds;

        this.updateSoundControls();
        this.applyTheme();
        this.applyAccentColor();
        this.applyFontSize();
    }

    resetPreferences() {
        if (confirm('Reset all preferences to defaults?')) {
            this.preferences = {
                appearance: {
                    theme: 'light',
                    accentColor: '#000080',
                    fontSize: '12',
                    windowStyle: 'system7'
                },
                sounds: {
                    enabled: true,
                    masterVolume: 50,
                    alertSound: 'beep',
                    soundEffects: true,
                    systemSounds: true
                }
            };
            this.savePreferences();
            this.applyPreferences();
        }
    }

    savePreferences() {
        localStorage.setItem('controlPanelPreferences', JSON.stringify(this.preferences));
    }

    loadPreferences() {
        const saved = localStorage.getItem('controlPanelPreferences');
        if (saved) {
            try {
                this.preferences = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading preferences:', e);
            }
        }
    }
}

// Initialize Control Panels
let controlPanels = null;
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('controlPanelWindow')) {
        controlPanels = new ControlPanels();
        controlPanels.init();
    }
});
