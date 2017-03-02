<?php
define('ANGUS_VER', '1.1');
// Theme seems to add this in automatically. Change version via style.css version information
//add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
//function theme_enqueue_styles() {
//    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
//    wp_enqueue_style( 'child-style',
//        get_stylesheet_directory_uri() . '/style.css',
//        array('parent-style'),
//    ANGUS_VER
//    );
//}

add_action('wp_enqueue_scripts', 'angus_enqueue_scripts');
function angus_enqueue_scripts() {
    wp_enqueue_script('angus_custom',
        get_stylesheet_directory_uri() . '/core/js/custom.js',
        'jquery', ANGUS_VER, true);
}