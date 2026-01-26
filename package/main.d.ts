export default CMS;
declare namespace CMS {
    export { init };
    export { registerCustomFormat };
    export { registerEditorComponent };
    export { registerEventListener };
    export { registerFieldType };
    export { registerPreviewStyle };
    export { registerPreviewTemplate };
    export { registerFieldType as registerWidget };
}
/**
 * Initialize the CMS, optionally with the given CMS configuration.
 * @param {object} [options] Options.
 * @param {CmsConfig} [options.config] Configuration to be merged with `config.yml`. Include
 * `load_config_file: false` to prevent the configuration file from being loaded.
 * @throws {TypeError} If `config` is not an object or undefined.
 * @see https://decapcms.org/docs/manual-initialization/
 * @see https://sveltiacms.app/en/docs/api/initialization
 */
export function init({ config }?: {
    config?: CmsConfig;
}): Promise<void>;
/**
 * Register a custom entry file format.
 * @param {string} name Format name. This should match the `format` option of a collection where the
 * custom format will be used..
 * @param {string} extension File extension.
 * @param {{ fromFile?: FileParser, toFile?: FileFormatter }} methods Parser and/or formatter
 * methods. Async functions can be used.
 * @throws {TypeError} If `name` or `extension` is not a string, or if `methods` is not an object.
 * @throws {Error} If at least one of `fromFile` or `toFile` is not provided.
 * @see https://decapcms.org/docs/custom-formatters/
 * @see https://sveltiacms.app/en/docs/api/file-formats
 */
declare function registerCustomFormat(name: string, extension: string, { fromFile, toFile }?: {
    fromFile?: FileParser;
    toFile?: FileFormatter;
}): void;
/**
 * Register a custom component.
 * @param {EditorComponentDefinition} definition Component definition.
 * @throws {TypeError} If `definition` is not an object, or if required properties are invalid.
 * @see https://decapcms.org/docs/custom-widgets/#registereditorcomponent
 * @see https://sveltiacms.app/en/docs/api/editor-components
 */
declare function registerEditorComponent(definition: EditorComponentDefinition): void;
/**
 * Register an event listener.
 * @param {AppEventListener} eventListener Event listener.
 * @throws {TypeError} If the event listener is not an object, or is missing required properties.
 * @throws {RangeError} If the event listener name is not supported.
 * @see https://decapcms.org/docs/registering-events/
 * @see https://sveltiacms.app/en/docs/api/events
 */
declare function registerEventListener(eventListener: AppEventListener): void;
/**
 * Register a custom field type (widget).
 * @param {string} name Field type name.
 * @param {ComponentType<CustomFieldControlProps> | string} control Component for the edit pane.
 * @param {ComponentType<CustomFieldPreviewProps>} [preview] Component for the preview pane.
 * @param {CustomFieldSchema} [schema] Field schema.
 * @see https://decapcms.org/docs/custom-widgets/
 * @see https://sveltiacms.app/en/docs/api/field-types
 */
declare function registerFieldType(name: string, control: ComponentType<CustomFieldControlProps> | string, preview?: ComponentType<CustomFieldPreviewProps>, schema?: CustomFieldSchema): void;
/**
 * Register a custom preview stylesheet.
 * @param {string} style URL, file path or raw CSS string.
 * @param {object} [options] Options.
 * @param {boolean} [options.raw] Whether to use a CSS string.
 * @throws {TypeError} If `style` is not a string, or `raw` is not a boolean.
 * @see https://decapcms.org/docs/customization/#registerpreviewstyle
 * @see https://sveltiacms.app/en/docs/api/preview-styles
 */
declare function registerPreviewStyle(style: string, { raw }?: {
    raw?: boolean;
}): void;
/**
 * Register a custom preview template.
 * @param {string} name Template name.
 * @param {ComponentType<CustomPreviewTemplateProps>} component React component.
 * @see https://decapcms.org/docs/customization/#registerpreviewtemplate
 * @see https://sveltiacms.app/en/docs/api/preview-templates
 */
declare function registerPreviewTemplate(name: string, component: ComponentType<CustomPreviewTemplateProps>): void;
import type { CmsConfig } from './types/public';
import type { FileParser } from './types/public';
import type { FileFormatter } from './types/public';
import type { EditorComponentDefinition } from './types/public';
import type { AppEventListener } from './types/public';
import type { CustomFieldControlProps } from './types/public';
import type { ComponentType } from 'react';
import type { CustomFieldPreviewProps } from './types/public';
import type { CustomFieldSchema } from './types/public';
import type { CustomPreviewTemplateProps } from './types/public';
export type { CmsConfig };
