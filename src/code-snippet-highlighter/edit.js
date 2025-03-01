import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { TextareaControl, SelectControl, PanelBody } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import Prism from 'prismjs';
import components from 'prismjs/components'; // Import components.json directly

// Import Prism.js CSS
import 'prismjs/themes/prism-twilight.css';
import './editor.scss';

// Extract language data from Prism.js components
const getLanguages = () => {
    const { languages } = components;
    return Object.entries(languages)
        .filter(([key]) => key !== 'meta') // Ignore meta section
        .map(([key, value]) => ({
            label: value.title || key, // Use title if available
            value: key, // Actual language ID
        }));
};

export default function Edit({ attributes, setAttributes }) {
    const { text, language } = attributes;
    const [isEditing, setIsEditing] = useState(!text);
    const [languages, setLanguages] = useState([]);

    // Load available languages on component mount
    useEffect(() => {
        setLanguages(getLanguages());
    }, []);

    // Highlight code whenever text or language changes
    useEffect(() => {
        if (language) {
            import(`prismjs/components/prism-${language}`)
                .then(() => Prism.highlightAll())
                .catch(() => console.warn(`Prism.js: Language '${language}' not found.`));
        }
    }, [text, language]);

    return (
        <div {...useBlockProps()}>
            {/* Sidebar Settings */}
            <InspectorControls>
                <PanelBody title={__('Code Language', 'vexoniq-custom-blocks')}>
                    <SelectControl
                        label={__('Select Language', 'vexoniq-custom-blocks')}
                        value={language}
                        options={languages.map(lang => ({
                            label: lang.label,
                            value: lang.value
                        }))}
                        onChange={(newLang) => setAttributes({ language: newLang })}
                    />
                </PanelBody>
            </InspectorControls>

            {/* Textarea for code input */}
            {isEditing ? (
                <div>
                    <TextareaControl
                        className="vexoniq-textarea"
                        placeholder={__('Enter your code...', 'vexoniq-custom-blocks')}
                        value={text}
                        onChange={(newText) => setAttributes({ text: newText })}
                    />
                    <button 
                        className="vexoniq-insert-button"
                        onClick={() => setIsEditing(false)}
                    >
                        {__('Insert', 'vexoniq-custom-blocks')}
                    </button>
                </div>
            ) : (
                <pre className="vexoniq-code-container">
                    <code 
                        className={`language-${language}`}
                        onClick={() => setIsEditing(true)}
                    >
                        {text || __('Click to edit...', 'vexoniq-custom-blocks')}
                    </code>
                </pre>
            )}
        </div>
    );
}
