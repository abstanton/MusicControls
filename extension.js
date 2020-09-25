
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const GLib = imports.gi.GLib;

let text, button;

function _hideHello() {
    Main.uiGroup.remove_actor(text);
    text = null;
}

function _nextSong() {
    GLib.spawn_command_line_async('dbus-send --print-reply --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.Next');
    
}

function _prevSong() {
    GLib.spawn_command_line_async('dbus-send --print-reply --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.Previous');
    
}

function init() {
    skipButton = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let skipIcon = new St.Icon({ icon_name: 'media-skip-forward',
                             style_class: 'system-status-icon' });

    skipButton.set_child(skipIcon);
    skipButton.connect('button-press-event', _nextSong);
    
    backButton = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let prevIcon = new St.Icon({ icon_name: 'media-skip-backward',
                             style_class: 'system-status-icon' });

    backButton.set_child(prevIcon);
    backButton.connect('button-press-event', _prevSong);
}

function enable() {
    Main.panel._centerBox.insert_child_at_index(backButton, 0);
    Main.panel._centerBox.insert_child_at_index(skipButton, 2);
}

function disable() {
    Main.panel._centerBox.remove_child(skipButton);
    Main.panel._centerBox.remove_child(backButton);
}
