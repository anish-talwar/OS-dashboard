// System 7 Menu Bar Handler

document.addEventListener('DOMContentLoaded', function() {
    setupMenuBar();
});

function setupMenuBar() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const dropdown = item.querySelector('.menu-dropdown');
        if (!dropdown) return;
        
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close other menus
            document.querySelectorAll('.menu-dropdown').forEach(d => {
                d.classList.remove('open');
            });
            document.querySelectorAll('.menu-item').forEach(m => {
                m.classList.remove('active');
            });
            
            // Open this menu
            dropdown.classList.add('open');
            item.classList.add('active');
        });
    });
    
    // Close menu when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.menu-item')) {
            document.querySelectorAll('.menu-dropdown').forEach(d => {
                d.classList.remove('open');
            });
            document.querySelectorAll('.menu-item').forEach(m => {
                m.classList.remove('active');
            });
        }
    });
}

// Menu Actions
function newTask() {
    closeMenus();
    openTaskModal();
}

function newGoal() {
    closeMenus();
    openGoalModal();
}

function exportData() {
    closeMenus();
    alert('Export feature coming soon!');
}

function closeAllWindows() {
    closeMenus();
    document.querySelectorAll('.mac-window').forEach(win => {
        toggleWindow(win.id);
    });
}

function undoAction() {
    closeMenus();
    alert('Undo not yet implemented');
}

function selectAll() {
    closeMenus();
    document.execCommand('selectAll');
}

function arrangeWindows() {
    closeMenus();
    let x = 20;
    let y = 40;
    const offsetX = 20;
    const offsetY = 20;
    const maxX = 800;
    
    document.querySelectorAll('.mac-window').forEach(win => {
        if (win.style.display !== 'none' && !win.classList.contains('modal-window')) {
            win.style.left = x + 'px';
            win.style.top = y + 'px';
            x += offsetX;
            y += offsetY;
            
            if (x > maxX) {
                x = 20;
                y += 100;
            }
        }
    });
}

function showAbout() {
    closeMenus();
    const aboutWindow = document.getElementById('aboutWindow');
    if (aboutWindow) {
        aboutWindow.style.display = 'flex';
        aboutWindow.classList.add('active');
    }
}

function showHelp() {
    closeMenus();
    alert('Help Topics\n\n⌘N: New Task\n⌘S: Save\nESC: Close Dialog\n\nDrag windows by title bar\nResize by corner');
}

function closeMenus() {
    document.querySelectorAll('.menu-dropdown').forEach(d => {
        d.classList.remove('open');
    });
    document.querySelectorAll('.menu-item').forEach(m => {
        m.classList.remove('active');
    });
}
