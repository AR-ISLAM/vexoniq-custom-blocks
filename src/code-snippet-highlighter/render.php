<?php
$text = isset($attributes['text']) ? esc_textarea($attributes['text']) : '';
$language = isset($attributes['language']) ? esc_attr($attributes['language']) : 'text';

if (empty($text)) {
    $text = __('Click to edit...', 'vexoniq-custom-blocks');
}

// Enqueue Prism.js and its styles
wp_enqueue_script('prism-js', 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js', [], null, true);
wp_enqueue_style('prism-css', 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css');

// Enqueue Clipboard.js for copying functionality
wp_enqueue_script('clipboard-js', 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.10/clipboard.min.js', [], null, true);
?>

<div class="wp-block-vexoniq-custom-blocks-code-highlighter">
    <div class="vexoniq-code-header">
        <span class="vexoniq-code-language"><?php echo strtoupper(esc_html($language)); ?></span>
        
        <button class="vexoniq-copy-button vexoniq-copy-<?php echo esc_attr($language); ?>" 
                data-clipboard-target="#vexoniq-code-<?php echo esc_attr($language); ?>">
            Copy
        </button>

        <span class="vexoniq-copy-popup vexoniq-popup-<?php echo esc_attr($language); ?>" style="display: none;">
            Copied!
        </span> 
    </div>

    <!-- Added ID to the <code> element -->
    <pre><code id="vexoniq-code-<?php echo esc_attr($language); ?>" class="language-<?php echo esc_attr($language); ?>"><?php echo esc_html($text); ?></code></pre>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        Prism.highlightAll();

        let clipboard = new ClipboardJS('.vexoniq-copy-button');

        clipboard.on('success', function(e) {
            let button = e.trigger;
            let popup = button.nextElementSibling; // Select the popup

            // Hide button and show popup
            button.style.display = "none";
            popup.style.display = "inline-block";

            // Reset after 5 seconds
            setTimeout(() => {
                popup.style.display = "none";
                button.style.display = "inline-block";
            }, 2000);
        });

        clipboard.on('error', function() {
            alert("Failed to copy!");
        });
    });
</script>
