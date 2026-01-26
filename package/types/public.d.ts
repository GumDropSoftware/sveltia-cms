/**
 * Standard [IETF locale tag](https://en.wikipedia.org/wiki/IETF_language_tag) like `en` or `en-US`.
 */
export type LocaleCode = string;
/**
 * An entry field name. It can be written in dot notation like `author.name` if the field is nested
 * with an Object field. For a List subfield, a wildcard can be used like `authors.*.name`. We call
 * this a key path, which is derived from the [IndexedDB API
 * terminology](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Terminology#key_path),
 * and use it everywhere, as entry data is managed as a [flatten
 * object](https://www.npmjs.com/package/flat) for easier access.
 */
export type FieldKeyPath = string;
/**
 * Cloud media storage name.
 */
export type CloudMediaLibraryName = "cloudinary" | "uploadcare";
/**
 * Supported media storage name.
 */
export type MediaLibraryName = "default" | CloudMediaLibraryName | "stock_assets";
/**
 * Supported raster image format.
 */
export type RasterImageFormat = "avif" | "gif" | "jpeg" | "png" | "webp";
/**
 * Supported vector image format.
 */
export type VectorImageFormat = "svg";
/**
 * Supported raster image conversion format. We don’t support AVIF at this time because no browser
 * supports AVIF encoding natively and `@jsquash/avif` is slow. Meanwhile, browsers other than
 * Safari support WebP encoding and `@jsquash/webp` is relatively fast.
 */
export type RasterImageConversionFormat = "webp";
/**
 * Raster image transformation options. See the
 * [documentation](https://sveltiacms.app/en/docs/media/internal#image-optimization) for details.
 */
export type RasterImageTransformationOptions = {
    /**
     * New format. Default: `webp`.
     */
    format?: RasterImageConversionFormat;
    /**
     * Image quality between 0 and 100. Default: `85`.
     */
    quality?: number;
    /**
     * Max width. Default: original width.
     */
    width?: number;
    /**
     * Max height. Default: original height.
     */
    height?: number;
};
/**
 * Raster image transformation option map.
 */
export type RasterImageTransformations = {
    /**
     * Raster image transformation options
     * that apply to any supported raster image format.
     */
    raster_image?: RasterImageTransformationOptions;
    /**
     * AVIF image transformation options.
     */
    avif?: RasterImageTransformationOptions;
    /**
     * GIF image transformation options.
     */
    gif?: RasterImageTransformationOptions;
    /**
     * JPEG image transformation options.
     */
    jpeg?: RasterImageTransformationOptions;
    /**
     * PNG image transformation options.
     */
    png?: RasterImageTransformationOptions;
    /**
     * WebP image transformation options.
     */
    webp?: RasterImageTransformationOptions;
};
/**
 * Vector image transformation option map.
 */
export type VectorImageTransformationOptions = {
    /**
     * Whether to optimize the image.
     */
    optimize?: boolean;
};
/**
 * Vector image transformation option map.
 */
export type VectorImageTransformations = {
    /**
     * SVG image transformation options.
     */
    svg?: VectorImageTransformationOptions;
};
/**
 * Image transformation option map.
 */
export type ImageTransformations = RasterImageTransformations & VectorImageTransformations;
/**
 * File transformation option map.
 */
export type FileTransformations = ImageTransformations;
/**
 * Configuration for the default media storage.
 */
export type DefaultMediaLibraryConfig = {
    /**
     * Whether to allow multiple file selection in the media storage.
     * This option is available for compatibility with the Cloudinary and Uploadcare media storage
     * providers, but you can simply use the `multiple` option for the File/Image field types instead.
     */
    multiple?: boolean;
    /**
     * Maximum file size in bytes that can be accepted for uploading.
     */
    max_file_size?: number;
    /**
     * Whether to rename an original asset file when saving it,
     * according to the global `slug` option. Default: `false`, meaning that the original file name is
     * kept by default, while Netlify/Decap CMS forces to slugify file names. If set to `true`, for
     * example, `Hello World (1).webp` would be `hello-world-1.webp`.
     */
    slugify_filename?: boolean;
    /**
     * File transformation option map. The key is an
     * original format like `png` or `jpeg`. It can also be `raster_image` that matches any supported
     * raster image format. See the
     * [documentation](https://sveltiacms.app/en/docs/media/internal#image-optimization) for details.
     */
    transformations?: FileTransformations;
};
/**
 * Options for the default media storage.
 */
export type DefaultMediaLibrary = {
    /**
     * Configuration for the default media storage.
     */
    config?: DefaultMediaLibraryConfig;
};
/**
 * Options for the [Cloudinary media storage](https://sveltiacms.app/en/docs/media/cloudinary).
 */
export type CloudinaryMediaLibrary = {
    /**
     * Whether to output a file name instead of a full URL.
     * Default: `false`.
     */
    output_filename_only?: boolean;
    /**
     * Whether to include transformation segments in an output
     * URL. Default: `true`.
     */
    use_transformations?: boolean;
    /**
     * Options to be passed to Cloudinary, such as `multiple`.
     * The `cloud_name` and `api_key` options are required for the global `media_library` option. See
     * the [Cloudinary
     * documentation](https://cloudinary.com/documentation/media_library_widget#2_set_the_configuration_options)
     * for a full list of available options. Some options, including `inline_container`, will be ignored
     * in Sveltia CMS because we use an API-based integration instead of Cloudinary’s pre-built widget.
     */
    config?: Record<string, any>;
};
/**
 * Settings for the [Uploadcare media storage](https://sveltiacms.app/en/docs/media/uploadcare).
 */
export type UploadcareMediaLibrarySettings = {
    /**
     * Whether to append a file name to an output URL. Default:
     * `false`.
     */
    autoFilename?: boolean;
    /**
     * Transformation operations to be included in an output URL.
     * Default: empty string.
     */
    defaultOperations?: string;
};
/**
 * Options for the [Uploadcare media storage](https://sveltiacms.app/en/docs/media/uploadcare).
 */
export type UploadcareMediaLibrary = {
    /**
     * Options to be passed to Uploadcare, such as `multiple`.
     * The `publicKey` option is required for the global `media_library` option. See the [Uploadcare
     * documentation](https://uploadcare.com/docs/uploads/file-uploader-options/) for a full list of
     * available options. Some options, including `previewStep`, will be ignored in Sveltia CMS because
     * we use an API-based integration instead of Uploadcare’s deprecated jQuery File Uploader.
     */
    config?: Record<string, any>;
    /**
     * Integration settings.
     */
    settings?: UploadcareMediaLibrarySettings;
};
/**
 * Name of supported stock photo/video provider.
 */
export type StockAssetProviderName = "pexels" | "pixabay" | "unsplash";
/**
 * Options for the unified stock photo/video providers.
 */
export type StockAssetMediaLibrary = {
    /**
     * Enabled stock photo/video providers. The stock
     * photo/video section in the asset browser is hidden if an empty array is given. Default: all
     * supported providers.
     */
    providers?: StockAssetProviderName[];
};
/**
 * Supported [media storage](https://sveltiacms.app/en/docs/media).
 */
export type MediaLibrary = DefaultMediaLibrary | CloudinaryMediaLibrary | UploadcareMediaLibrary | StockAssetMediaLibrary;
/**
 * Unified media storage option that supports multiple storage providers. See the
 * [documentation](https://sveltiacms.app/en/docs/media#configuration) for details.
 */
export type MediaLibraries = {
    /**
     * Options for the default media storage.
     */
    default?: DefaultMediaLibrary;
    /**
     * Options for the Cloudinary media storage.
     */
    cloudinary?: CloudinaryMediaLibrary;
    /**
     * Options for the Uploadcare media storage.
     */
    uploadcare?: UploadcareMediaLibrary;
    /**
     * Options for the unified stock photo/video media
     * library.
     */
    stock_assets?: StockAssetMediaLibrary;
};
/**
 * Common field properties that are shared among all field types.
 */
export type CommonFieldProps = {
    /**
     * Unique identifier for the field. It cannot include periods and spaces.
     */
    name: string;
    /**
     * Whether to enable the editor UI
     * in locales other than the default locale. Default: `false`. `duplicate` disables the UI in
     * non-default like `false` but automatically copies the default locale’s value to other locales.
     * `translate` and `none` are aliases of `true` and `false`, respectively. This option only works
     * when i18n is set up with the global and collection-level `i18n` option. See the
     * [documentation](https://sveltiacms.app/en/docs/i18n#field-level-configuration) for details.
     */
    i18n?: boolean | "duplicate" | "translate" | "none";
};
/**
 * Properties for a field that is visible in the editor UI.
 */
export type VisibleFieldProps = {
    /**
     * Label of the field to be displayed in the editor UI. Default: `name`
     * field value.
     */
    label?: string;
    /**
     * Short description of the field to be displayed in the editor UI.
     */
    comment?: string;
    /**
     * Help message to be displayed below the input UI. Limited Markdown
     * formatting is supported: bold, italic, strikethrough and links.
     */
    hint?: string;
    /**
     * Whether to show the preview of the field. Default: `true`.
     */
    preview?: boolean;
    /**
     * Whether to make data input on the field required.
     * Default: `true`. This option also affects data output if the `omit_empty_optional_fields` global
     * output option is `true`. If i18n is enabled and the field doesn’t require input in all locales,
     * required locale codes can be passed as an array like `[en, fr]` instead of a boolean.
     */
    required?: boolean | LocaleCode[];
    /**
     * Whether to make the field read-only. Default: `false`. This is
     * useful when a `default` value is provided and the field should not be editable by users.
     */
    readonly?: boolean;
};
/**
 * Field validation properties.
 */
export type FieldValidationProps = {
    /**
     * Validation format. The first argument is a
     * regular expression matching pattern for a valid input value, and the second argument is an error
     * message to be displayed when the input value does not match the pattern.
     */
    pattern?: [string | RegExp, string];
};
/**
 * Field-level media storage options.
 */
export type FieldMediaLibraryOptions = {
    /**
     * Library name.
     */
    name?: MediaLibraryName;
};
/**
 * Media field properties.
 */
export type MediaFieldProps = {
    /**
     * Default value. Accepts a file path or complete URL. If
     * the `multiple` option is set to `true`, it accepts an array of file paths or URLs.
     */
    default?: string | string[];
    /**
     * Whether to allow multiple file selection for the field. Default:
     * `false`.
     */
    multiple?: boolean;
    /**
     * Minimum number of files that can be selected. Ignored unless the
     * `multiple` option is set to `true`. Default: `0`.
     */
    min?: number;
    /**
     * Maximum number of files that can be selected.  Ignored unless the
     * `multiple` option is set to `true`. Default: `Infinity`.
     */
    max?: number;
    /**
     * File types that the field should accept. The value would be a
     * comma-separated list of unique file type specifiers, the format used for the HTML
     * [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept)
     * attribute.
     */
    accept?: string;
    /**
     * Whether to show the URL input UI. Default: `true`.
     */
    choose_url?: boolean;
    /**
     * Internal media folder path for the field. Default: global or
     * collection-level `media_folder` value.
     */
    media_folder?: string;
    /**
     * Public media folder path for the field. Default:
     * `media_folder` option value.
     */
    public_folder?: string;
    /**
     * Legacy media storage option
     * that allows only one library. This overrides the global `media_library` option. Use
     * `media_libraries` instead to support multiple libraries.
     */
    media_library?: MediaLibrary & FieldMediaLibraryOptions;
    /**
     * Unified media storage option that supports multiple
     * libraries. This overrides the global `media_libraries` option.
     */
    media_libraries?: MediaLibraries;
};
/**
 * Options for a field accepting multiple values.
 */
export type MultiValueFieldProps = {
    /**
     * Minimum number of items that can be added. Default: `0`.
     */
    min?: number;
    /**
     * Maximum number of items that can be added. Default: `Infinity`.
     */
    max?: number;
};
/**
 * Options for a field showing multiple options.
 */
export type MultiOptionFieldProps = {
    /**
     * Whether to accept multiple values. Default: `false`.
     */
    multiple?: boolean;
    /**
     * Minimum number of items that can be selected. Ignored if `multiple` is
     * `false`. Default: `0`.
     */
    min?: number;
    /**
     * Maximum number of items that can be selected. Ignored if `multiple` is
     * `false`. Default: `Infinity`.
     */
    max?: number;
    /**
     * Maximum number of options to be displayed as radio
     * buttons (single-select) or checkboxes (multi-select) rather than a dropdown list. Default: `5`.
     */
    dropdown_threshold?: number;
};
/**
 * Variable type for List/Object fields.
 */
export type VariableFieldType = {
    /**
     * Unique identifier for the type.
     */
    name: string;
    /**
     * Label of the type to be displayed in the editor UI. Default: `name`
     * field value.
     */
    label?: string;
    /**
     * Field type. Values other than `object` are ignored.
     */
    widget?: "object";
    /**
     * Template of a label to be displayed on a collapsed object.
     */
    summary?: string;
    /**
     * Set of subfields. This option can be omitted; in that case, only the
     * `type` property will be saved.
     */
    fields?: Field[];
};
/**
 * Variable field properties.
 */
export type VariableFieldProps = {
    /**
     * Set of nested Object fields to be selected or added.
     */
    types: VariableFieldType[];
    /**
     * Property name to store the type name in nested objects. Default:
     * `type`.
     */
    typeKey?: string;
};
/**
 * Options for a field with a simple input UI that allows for extra labels.
 */
export type AdjacentLabelProps = {
    /**
     * An extra label to be displayed before the input UI. Markdown is
     * supported. Default: empty string.
     */
    before_input?: string;
    /**
     * An extra label to be displayed after the input UI. Markdown is
     * supported. Default: empty string.
     */
    after_input?: string;
};
/**
 * Options for a field with a string-type input UI that counts the number of characters.
 */
export type CharCountProps = {
    /**
     * Minimum number of characters that can be entered in the input.
     * Default: `0`.
     */
    minlength?: number;
    /**
     * Maximum number of characters that can be entered in the input.
     * Default: `Infinity`.
     */
    maxlength?: number;
};
/**
 * Boolean field properties.
 */
export type BooleanFieldProps = {
    /**
     * Field type.
     */
    widget: "boolean";
    /**
     * Default value. Accepts `true` or `false`.
     */
    default?: boolean;
};
/**
 * Boolean field definition.
 */
export type BooleanField = CommonFieldProps & VisibleFieldProps & BooleanFieldProps & AdjacentLabelProps;
/**
 * Code field properties.
 */
export type CodeFieldProps = {
    /**
     * Field type.
     */
    widget: "code";
    /**
     * Default value. It must be a string if
     * `output_code_only` is `false`. Otherwise it must be an object that match the `keys` option.
     */
    default?: string | Record<string, string>;
    /**
     * Default language to be selected, like `js`. See the [Prism
     * documentation](https://prismjs.com/#supported-languages) for a list of supported languages.
     * Default: empty string, which is plaintext.
     */
    default_language?: string;
    /**
     * Whether to show a language switcher so that users
     * can change the language mode. Default: `true` (the Decap CMS document is wrong).
     */
    allow_language_selection?: boolean;
    /**
     * Whether to output code snippet only. Default: `false`.
     */
    output_code_only?: boolean;
    /**
     * Output property names. It has no effect if
     * `output_code_only` is `true`. Default: `{ code: 'code', lang: 'lang' }`.
     */
    keys?: {
        code: string;
        lang: string;
    };
};
/**
 * Code field definition.
 */
export type CodeField = CommonFieldProps & VisibleFieldProps & FieldValidationProps & CodeFieldProps;
/**
 * Color field properties.
 */
export type ColorFieldProps = {
    /**
     * Field type.
     */
    widget: "color";
    /**
     * Default value. Accepts a Hex color code in the six-value (`#RRGGBB`)
     * or eight-value (`#RRGGBBAA`) syntax.
     */
    default?: string;
    /**
     * Whether to show a textbox that allows users to manually edit the
     * value. Default: `false`.
     */
    allowInput?: boolean;
    /**
     * Whether to edit/save the alpha channel value. Default: `false`.
     */
    enableAlpha?: boolean;
};
/**
 * Color field definition.
 */
export type ColorField = CommonFieldProps & VisibleFieldProps & FieldValidationProps & ColorFieldProps;
/**
 * Compute field properties.
 */
export type ComputeFieldProps = {
    /**
     * Field type.
     */
    widget: "compute";
    /**
     * Value template, like `posts-{{fields.slug}}`.
     */
    value: string;
};
/**
 * Compute field definition.
 */
export type ComputeField = CommonFieldProps & VisibleFieldProps & ComputeFieldProps;
/**
 * DateTime field properties.
 */
export type DateTimeFieldProps = {
    /**
     * Field type.
     */
    widget: "datetime";
    /**
     * Default value. Accepts a date/time string that matches the `format`,
     * or `{{now}}` to populate the current date/time. Default: empty string.
     */
    default?: string;
    /**
     * Storage format written in [Day.js
     * tokens](https://day.js.org/docs/en/display/format). Default: ISO 8601 format.
     */
    format?: string;
    /**
     * Date storage format written in [Day.js
     * tokens](https://day.js.org/docs/en/display/format) if the value is a string and the `format`
     * option is not defined. If `true`, ISO 8601 format is used unless the `format` option is defined.
     * If `false`, date input/output is disabled.
     */
    date_format?: string | boolean;
    /**
     * Time storage format written in [Day.js
     * tokens](https://day.js.org/docs/en/display/format) if the value is a string and the `format`
     * option is not defined. If `true`, ISO 8601 format is used unless the `format` option is defined.
     * If `false`, time input/output is disabled.
     */
    time_format?: string | boolean;
    /**
     * Whether to make the date input/output UTC. Default: `false`.
     */
    picker_utc?: boolean;
};
/**
 * DateTime field definition.
 */
export type DateTimeField = CommonFieldProps & VisibleFieldProps & FieldValidationProps & DateTimeFieldProps;
/**
 * File field properties.
 */
export type FileFieldProps = {
    /**
     * Field type.
     */
    widget: "file";
};
/**
 * File field definition.
 */
export type FileField = CommonFieldProps & VisibleFieldProps & FieldValidationProps & MediaFieldProps & FileFieldProps;
/**
 * Hidden field properties.
 */
export type HiddenFieldProps = {
    /**
     * Field type.
     */
    widget: "hidden";
    /**
     * Default value. Accepts any data type that can be stored with the
     * configured file format.
     */
    default?: any;
};
/**
 * Hidden field definition.
 */
export type HiddenField = CommonFieldProps & HiddenFieldProps;
/**
 * Image field properties.
 */
export type ImageFieldProps = {
    /**
     * Field type.
     */
    widget: "image";
};
/**
 * Image field definition.
 */
export type ImageField = CommonFieldProps & VisibleFieldProps & FieldValidationProps & MediaFieldProps & ImageFieldProps;
/**
 * KeyValue field properties compatible with Static CMS.
 */
export type KeyValueFieldProps = {
    /**
     * Field type.
     */
    widget: "keyvalue";
    /**
     * Default key-value pairs.
     */
    default?: Record<string, string>;
    /**
     * Label for the key column. Default: Key.
     */
    key_label?: string;
    /**
     * Label for the value column. Default: Value.
     */
    value_label?: string;
};
/**
 * KeyValue field definition.
 */
export type KeyValueField = CommonFieldProps & VisibleFieldProps & KeyValueFieldProps & MultiValueFieldProps;
/**
 * List field properties.
 */
export type ListFieldProps = {
    /**
     * Field type.
     */
    widget: "list";
    /**
     * Default value. The
     * format depends on how the field is configured, with or without `field`, `fields` or `types`. See
     * the document for details.
     */
    default?: string[] | Record<string, any>[] | Record<string, any>;
};
/**
 * Base properties for a List field.
 */
export type ListFieldBaseProps = CommonFieldProps & VisibleFieldProps & ListFieldProps & MultiValueFieldProps;
/**
 * Simple List field definition with primitive item types.
 */
export type SimpleListField = ListFieldBaseProps & FieldValidationProps;
/**
 * Base properties for a complex List field with subfields or variable types.
 */
export type ComplexListFieldBaseProps = {
    /**
     * Whether to allow users to add new items to the list. Default:
     * `true`.
     */
    allow_add?: boolean;
    /**
     * Whether to allow users to remove items from the list. Default:
     * `true`.
     */
    allow_remove?: boolean;
    /**
     * Whether to allow users to reorder items in the list. Default:
     * `true`.
     */
    allow_reorder?: boolean;
    /**
     * Whether to add new items to the top of the list instead of the
     * bottom. Default: `false`.
     */
    add_to_top?: boolean;
    /**
     * Label to be displayed on the Add button. Default: `label`
     * field value.
     */
    label_singular?: string;
    /**
     * Template of a label to be displayed on a collapsed list item.
     */
    summary?: string;
    /**
     * Subfield name to be used as a thumbnail image for a list item. It
     * will be displayed along with the summary label when the item is collapsed. The subfield must be
     * an Image field. Default: none.
     */
    thumbnail?: string;
    /**
     * Whether to collapse the list items by default. Default:
     * `false`. If set to `auto`, the UI is collapsed if the item has any filled subfields and expanded
     * if all the subfields are empty.
     */
    collapsed?: boolean | "auto";
    /**
     * Whether to collapse the entire list. Default:
     * `false`. If set to `auto`, the UI is collapsed if the list has any items and expanded if it’s
     * empty.
     */
    minimize_collapsed?: boolean | "auto";
    /**
     * Whether to save the field value at the top-level of the data file
     * without the field name. If the `single_file` i18n structure is enabled, the lists will still be
     * saved under locale keys. Default: `false`. See the
     * [documentation](https://sveltiacms.app/en/docs/fields/list#top-level-list) for details.
     */
    root?: boolean;
};
/**
 * Properties for a complex List field with subfields or variable types.
 */
export type ComplexListFieldProps = ListFieldBaseProps & ComplexListFieldBaseProps;
/**
 * Properties for a List field with a single subfield.
 */
export type ListFieldSubFieldProps = {
    /**
     * Single field to be included in a list item.
     */
    field: Field;
};
/**
 * List field definition with a single subfield.
 */
export type ListFieldWithSubField = ComplexListFieldProps & ListFieldSubFieldProps;
/**
 * Properties for a List field with multiple subfields.
 */
export type ListFieldSubFieldsProps = {
    /**
     * Set of fields to be included in a list item.
     */
    fields: Field[];
};
/**
 * List field definition with multiple subfields.
 */
export type ListFieldWithSubFields = ComplexListFieldProps & ListFieldSubFieldsProps;
/**
 * List field definition with variable types.
 */
export type ListFieldWithTypes = ComplexListFieldProps & VariableFieldProps;
/**
 * List field definition with complex items.
 */
export type ComplexListField = ListFieldWithSubField | ListFieldWithSubFields | ListFieldWithTypes;
/**
 * List field definition.
 */
export type ListField = SimpleListField | ListFieldWithSubField | ListFieldWithSubFields | ListFieldWithTypes;
/**
 * Map field properties.
 */
export type MapFieldProps = {
    /**
     * Field type.
     */
    widget: "map";
    /**
     * Default value. Accepts a stringified single
     * [GeoJSON](https://geojson.org/) geometry object that contains `type` and `coordinates`
     * properties.
     */
    default?: string;
    /**
     * Precision of coordinates to be saved. Default: `7`.
     */
    decimals?: number;
    /**
     * Geometry type. Default: `Point`.
     */
    type?: "Point" | "LineString" | "Polygon";
};
/**
 * Map field definition.
 */
export type MapField = CommonFieldProps & VisibleFieldProps & FieldValidationProps & MapFieldProps;
/**
 * Supported button name for the rich text editor.
 */
export type RichTextEditorButtonName = "bold" | "italic" | "strikethrough" | "code" | "link" | "heading-one" | "heading-two" | "heading-three" | "heading-four" | "heading-five" | "heading-six" | "quote" | "bulleted-list" | "numbered-list";
/**
 * Built-in editor component name for the rich text editor.
 */
export type RichTextEditorComponentName = "code-block" | "image";
/**
 * Supported mode name for the rich text editor.
 */
export type RichTextEditorMode = "rich_text" | "raw";
/**
 * RichText field base properties.
 */
export type RichTextFieldBaseProps = {
    /**
     * Default value.
     */
    default?: string;
    /**
     * Whether to minimize the toolbar height.
     */
    minimal?: boolean;
    /**
     * Names of formatting buttons and menu items to be
     * enabled in the editor UI. Default: all the supported button names.
     */
    buttons?: RichTextEditorButtonName[];
    /**
     * Names of components to
     * be enabled in the editor UI. This may include custom component names. Default: all the built-in
     * component names.
     */
    editor_components?: (RichTextEditorComponentName | string)[];
    /**
     * Editor modes to be enabled. If it’s `[raw, rich_text]`,
     * rich text mode is disabled by default. Default: `[rich_text, raw]`.
     */
    modes?: RichTextEditorMode[];
    /**
     * Whether to sanitize the preview HTML. Default: `true`.
     * Note that Sveltia CMS has changed the default value from `false` to `true` to enhance security,
     * whereas Netlify/Decap CMS keeps it as `false`. We recommend keeping this option enabled unless
     * disabling it fixes a broken preview and you fully trust all users of your CMS.
     */
    sanitize_preview?: boolean;
    /**
     * Whether to enable the linked images feature for the built-in
     * `image` component. Default: `true`. When enabled, the image component provides an additional text
     * field for specifying a URL to wrap the image as a link. The resulting Markdown output will be in
     * the format `[![alt](src)](link)`, where clicking the image navigates to the provided link. This
     * feature can be disabled if it causes conflicts with certain frameworks.
     */
    linked_images?: boolean;
};
/**
 * RichText field properties.
 */
export type RichTextFieldProps = {
    /**
     * Field type.
     */
    widget: "richtext";
};
/**
 * RichText field definition.
 */
export type RichTextField = CommonFieldProps & VisibleFieldProps & FieldValidationProps & RichTextFieldBaseProps & RichTextFieldProps;
/**
 * Markdown field properties.
 */
export type MarkdownFieldProps = {
    /**
     * Field type.
     */
    widget: "markdown";
};
/**
 * Markdown field definition.
 */
export type MarkdownField = CommonFieldProps & VisibleFieldProps & FieldValidationProps & RichTextFieldBaseProps & MarkdownFieldProps;
/**
 * Number field properties.
 */
export type NumberFieldProps = {
    /**
     * Field type.
     */
    widget: "number";
    /**
     * Default value.
     */
    default?: number | string;
    /**
     * Type of the value. `int`
     * makes the input accept only an integer value and saves it as a number. `float` makes the input
     * accept only a floating-point value and saves it as a number. `int/string` and `float/string` make
     * the input accept only an integer or floating-point value, respectively, but save it as a string.
     * Default: `int`.
     */
    value_type?: "int" | "float" | "int/string" | "float/string";
    /**
     * Minimum value that can be entered in the input. Default: `-Infinity`.
     */
    min?: number;
    /**
     * Maximum value that can be entered in the input. Default: `Infinity`.
     */
    max?: number;
    /**
     * Number to increase/decrease with the arrow key/button. Default: `1`.
     */
    step?: number;
};
/**
 * Number field definition.
 */
export type NumberField = CommonFieldProps & VisibleFieldProps & FieldValidationProps & NumberFieldProps & AdjacentLabelProps;
/**
 * Object field properties.
 */
export type ObjectFieldProps = {
    /**
     * Field type.
     */
    widget: "object";
    /**
     * Default values.
     */
    default?: Record<string, any>;
    /**
     * Whether to collapse the object by default. Default:
     * `false`. If set to `auto`, the UI is collapsed if the object has any filled subfields and
     * expanded if all the subfields are empty.
     */
    collapsed?: boolean | "auto";
    /**
     * Template of a label to be displayed on a collapsed object.
     */
    summary?: string;
};
/**
 * Base properties for a complex Object field with subfields or variable types.
 */
export type ComplexObjectFieldProps = CommonFieldProps & VisibleFieldProps & ObjectFieldProps;
/**
 * Properties for an Object field with multiple subfields.
 */
export type ObjectFieldSubFieldsProps = {
    /**
     * Set of fields to be included.
     */
    fields: Field[];
};
/**
 * Object field definition with multiple subfields.
 */
export type ObjectFieldWithSubFields = ComplexObjectFieldProps & ObjectFieldSubFieldsProps;
/**
 * Object field definition with variable types.
 */
export type ObjectFieldWithTypes = ComplexObjectFieldProps & VariableFieldProps;
/**
 * Object field definition.
 */
export type ObjectField = ObjectFieldWithSubFields | ObjectFieldWithTypes;
/**
 * Entry filter options for a Relation field.
 */
export type RelationFieldFilterOptions = {
    /**
     * Field name.
     */
    field: FieldKeyPath;
    /**
     * One or more values to be matched.
     */
    values: any[];
};
/**
 * Relation field properties.
 */
export type RelationFieldProps = {
    /**
     * Field type.
     */
    widget: "relation";
    /**
     * Default value(s), which should match the options. When
     * `multiple` is `false`, it should be a single value that matches the `value_field` option.
     */
    default?: any | any[];
    /**
     * Referenced collection name. Use `_singletons` for the singleton
     * collection.
     */
    collection: string;
    /**
     * Referenced file identifier for a file/singleton collection. Required if
     * the `collection` is defined.
     */
    file?: string;
    /**
     * Field name to be stored as the value, or
     * `{{slug}}` (entry slug). It can contain a locale prefix like `{{locale}}/{{slug}}` if i18n is
     * enabled. Default: `{{slug}}`.
     */
    value_field?: FieldKeyPath | string;
    /**
     * Name of fields to be displayed. It can
     * contain string templates. Default: `value_field` field value or the referenced collection’s
     * `identifier_field`, which is `title` by default.
     */
    display_fields?: (FieldKeyPath | string)[];
    /**
     * Name of fields to be searched. Default:
     * `display_fields` field value.
     */
    search_fields?: FieldKeyPath[];
    /**
     * Entry filter options.
     */
    filters?: RelationFieldFilterOptions[];
};
/**
 * Relation field definition.
 */
export type RelationField = CommonFieldProps & VisibleFieldProps & FieldValidationProps & RelationFieldProps & MultiOptionFieldProps;
/**
 * Select field option value.
 */
export type SelectFieldValue = string | number | null;
/**
 * Select field properties.
 */
export type SelectFieldProps = {
    /**
     * Field type.
     */
    widget: "select";
    /**
     * Default value that matches one of the
     * options. When `multiple` is `true`, it should be an array of valid values.
     */
    default?: SelectFieldValue | SelectFieldValue[];
    /**
     * Options.
     */
    options: SelectFieldValue[] | {
        label: string;
        value: SelectFieldValue;
    }[];
};
/**
 * Select field definition.
 */
export type SelectField = CommonFieldProps & VisibleFieldProps & FieldValidationProps & SelectFieldProps & MultiOptionFieldProps;
/**
 * String field properties.
 */
export type StringFieldProps = {
    /**
     * Field type.
     */
    widget?: "string";
    /**
     * Default value.
     */
    default?: string;
    /**
     * Data type. It’s useful when the input value needs a
     * validation. Default: `text`.
     */
    type?: "text" | "url" | "email";
    /**
     * A string to be prepended to the value. Default: empty string.
     */
    prefix?: string;
    /**
     * A string to be appended to the value. Default: empty string.
     */
    suffix?: string;
};
/**
 * String field definition.
 */
export type StringField = CommonFieldProps & VisibleFieldProps & FieldValidationProps & StringFieldProps & AdjacentLabelProps & CharCountProps;
/**
 * Text field properties.
 */
export type TextFieldProps = {
    /**
     * Field type.
     */
    widget: "text";
    /**
     * Default value.
     */
    default?: string;
};
/**
 * Text field definition.
 */
export type TextField = CommonFieldProps & VisibleFieldProps & FieldValidationProps & TextFieldProps & CharCountProps;
/**
 * UUID field properties.
 */
export type UuidFieldProps = {
    /**
     * Field type.
     */
    widget: "uuid";
    /**
     * Default value.
     */
    default?: string;
    /**
     * A string to be prepended to the value. Default: empty string.
     */
    prefix?: string;
    /**
     * Whether to encode the value with Base32. Default: `false`.
     */
    use_b32_encoding?: boolean;
    /**
     * Whether to make the field read-only. Default: `true`.
     * @deprecated Use the `readonly` common field option instead, which defaults to `true` for the
     * UUID field type.
     */
    read_only?: boolean;
};
/**
 * UUID field definition.
 */
export type UuidField = CommonFieldProps & VisibleFieldProps & UuidFieldProps;
/**
 * Visible field types.
 */
export type VisibleField = BooleanField | CodeField | ColorField | ComputeField | DateTimeField | FileField | ImageField | KeyValueField | ListField | MapField | MarkdownField | NumberField | ObjectField | RelationField | RichTextField | SelectField | StringField | TextField | UuidField;
/**
 * Entry field using a built-in field type.
 */
export type StandardField = VisibleField | HiddenField;
/**
 * Media field types.
 */
export type MediaField = FileField | ImageField;
/**
 * Field types that have the `multiple` option.
 */
export type MultiValueField = MediaField | RelationField | SelectField;
/**
 * Field types that have the `min` and `max` options.
 */
export type MinMaxValueField = MultiValueField | ListField | NumberField;
/**
 * Field types that have subfields.
 */
export type FieldWithSubFields = ListFieldWithSubFields | ObjectFieldWithSubFields;
/**
 * Field types that support variable types.
 */
export type FieldWithTypes = ListFieldWithTypes | ObjectFieldWithTypes;
/**
 * Built-in field type name. Sveltia CMS supports all the built-in field types provided by Decap CMS
 * as well as some new field types.
 */
export type BuiltInFieldType = "boolean" | "code" | "color" | "compute" | "datetime" | "file" | "hidden" | "image" | "keyvalue" | "list" | "map" | "markdown" | "number" | "object" | "relation" | "richtext" | "select" | "string" | "text" | "uuid";
/**
 * Custom field properties.
 */
export type CustomFieldProps = {
    /**
     * Field type.
     */
    widget: Exclude<string, BuiltInFieldType | "">;
};
/**
 * Entry field using a custom field type.
 */
export type CustomField = CommonFieldProps & VisibleFieldProps & CustomFieldProps & Record<string, any>;
/**
 * Entry field.
 */
export type Field = StandardField | CustomField;
/**
 * Internationalization (i18n) file structure type.
 */
export type I18nFileStructure = "single_file" | "multiple_files" | "multiple_folders" | "multiple_folders_i18n_root";
/**
 * Global, collection-level or collection file-level i18n options. See the
 * [documentation](https://sveltiacms.app/en/docs/i18n) for details.
 */
export type I18nOptions = {
    /**
     * File structure for entry collections. File/singleton
     * collection must define the structure using `{{locale}}` in the `file` option. See the
     * [documentation](https://sveltiacms.app/en/docs/i18n#managing-content-structure) for details.
     */
    structure: I18nFileStructure;
    /**
     * List of all available locales.
     */
    locales: LocaleCode[];
    /**
     * Default locale. Default: first locale in the `locales`
     * option.
     */
    default_locale?: LocaleCode;
    /**
     * Locales to be enabled when
     * creating a new entry draft. If this option is used, users will be able to disable the output of
     * non-default locales through the UI. See the
     * [documentation](https://sveltiacms.app/en/docs/i18n#disabling-non-default-locale-content) for
     * details.
     */
    initial_locales?: LocaleCode[] | "all" | "default";
    /**
     * Whether to save collection entries in all the locales.
     * Default: `true`.
     * @deprecated Use the `initial_locales` option instead, which provides more flexibility.
     * `save_all_locales: false` is equivalent to `initial_locales: all`. See the documentation
     * https://sveltiacms.app/en/docs/i18n#disabling-non-default-locale-content for details.
     */
    save_all_locales?: boolean;
    /**
     * Property name and value template
     * used to add a canonical slug to entry files, which helps Sveltia CMS and some frameworks to link
     * localized files when entry slugs are localized. The default property name is `translationKey`
     * used in Hugo’s multilingual support, and the default value is the default locale’s slug. See the
     * [documentation](https://sveltiacms.app/en/docs/i18n#localizing-entry-slugs) for details.
     */
    canonical_slug?: {
        key?: string;
        value?: string;
    };
    /**
     * Whether to exclude the default locale
     * from entry filenames. Default: `false`. This option applies to entry collections with the
     * `multiple_files` i18n structure enabled, as well as to file/singleton collection items with the
     * `file` path ending with `.{{locale}}.<extension>`, aiming to support [Zola’s multilingual
     * sites](https://www.getzola.org/documentation/content/multilingual/).
     */
    omit_default_locale_from_filename?: boolean;
};
/**
 * Single file in a file/singleton collection.
 */
export type CollectionFile = {
    /**
     * Unique identifier for the file.
     */
    name: string;
    /**
     * Label to be displayed in the editor UI. Default: `name` option value.
     */
    label?: string;
    /**
     * Name of a [Material Symbols
     * icon](https://fonts.google.com/icons?icon.set=Material+Symbols) to be displayed in the collection
     * file list and other places. See the
     * [documentation](https://sveltiacms.app/en/docs/collections#icons) for details.
     */
    icon?: string;
    /**
     * File path relative to the project root.
     */
    file: string;
    /**
     * Set of fields to be included in the file.
     */
    fields: Field[];
    /**
     * Internal media folder path for the collection. This overrides
     * the global or collection-level `media_folder` option.
     */
    media_folder?: string;
    /**
     * Public media folder path for an entry collection. This
     * overrides the global or collection-level `public_folder` option. Default: `media_folder` option
     * value.
     */
    public_folder?: string;
    /**
     * File format. This overrides the collection-level `format` option.
     * Default: `yaml-frontmatter`.
     */
    format?: FileFormat;
    /**
     * Delimiters to be used for the front matter
     * format. This overrides the collection-level `frontmatter_delimiter` option. Default: depends on
     * the front matter type.
     */
    frontmatter_delimiter?: string | string[];
    /**
     * I18n options. Default: `false`.
     */
    i18n?: I18nOptions | boolean;
    /**
     * Preview URL path template.
     */
    preview_path?: string;
    /**
     * Date field name used for `preview_path`.
     */
    preview_path_date_field?: FieldKeyPath;
    /**
     * Editor view options.
     */
    editor?: EditorOptions;
};
/**
 * Supported file extension. Actually it can be any string.
 */
export type FileExtension = "yml" | "yaml" | "toml" | "json" | "md" | "markdown" | "html" | "txt" | string;
/**
 * Supported Markdown front matter format.
 */
export type FrontMatterFormat = "yaml-frontmatter" | "toml-frontmatter" | "json-frontmatter";
/**
 * Supported file format. Actually it can be any string because of custom formats.
 */
export type FileFormat = "yml" | "yaml" | "toml" | "json" | "frontmatter" | FrontMatterFormat | "raw" | string;
/**
 * Collection filter options.
 */
export type CollectionFilter = {
    /**
     * Field name.
     */
    field: FieldKeyPath;
    /**
     * Field value. `null` can be used to match an undefined field.
     * Multiple values can be defined with an array. This option or `pattern` is required.
     */
    value?: any | any[];
    /**
     * Regular expression matching pattern.
     */
    pattern?: string | RegExp;
};
/**
 * The default options for the sortable fields.
 */
export type SortableFieldsDefaultOptions = {
    /**
     * A field name to be sorted by default.
     */
    field: FieldKeyPath;
    /**
     * Default
     * sort direction. Title case values are supported for Static CMS compatibility. However, `None` is
     * the same as `ascending`. Default: `ascending`.
     */
    direction?: "ascending" | "descending" | "Ascending" | "Descending" | "None";
};
/**
 * A collection’s advanced sortable fields definition, which is compatible with Static CMS.
 */
export type SortableFields = {
    /**
     * A list of sortable field names.
     */
    fields: FieldKeyPath[];
    /**
     * Default sort settings. See the
     * [documentation](https://sveltiacms.app/en/docs/collections/entries#sorting) for details.
     */
    default?: SortableFieldsDefaultOptions;
};
/**
 * View filter.
 */
export type ViewFilter = {
    /**
     * Unique identifier for the filter.
     */
    name?: string;
    /**
     * Label.
     */
    label: string;
    /**
     * Field name.
     */
    field: FieldKeyPath;
    /**
     * Regular expression matching pattern or exact value.
     */
    pattern: string | RegExp | boolean;
};
/**
 * A collection’s advanced filter definition, which is compatible with Static CMS.
 */
export type ViewFilters = {
    /**
     * A list of view filters.
     */
    filters: ViewFilter[];
    /**
     * Default filter name.
     */
    default?: string;
};
/**
 * View group.
 */
export type ViewGroup = {
    /**
     * Unique identifier for the group.
     */
    name?: string;
    /**
     * Label.
     */
    label: string;
    /**
     * Field name.
     */
    field: FieldKeyPath;
    /**
     * Regular expression matching pattern or exact
     * value.
     */
    pattern?: string | RegExp | boolean;
};
/**
 * A collection’s advanced group definition, which is compatible with Static CMS.
 */
export type ViewGroups = {
    /**
     * A list of view groups.
     */
    groups: ViewGroup[];
    /**
     * Default group name.
     */
    default?: string;
};
/**
 * Editor options.
 */
export type EditorOptions = {
    /**
     * Whether to show the preview pane. Default: `true`.
     */
    preview: boolean;
};
/**
 * Nested collection options.
 */
export type NestedCollectionOptions = {
    /**
     * Maximum depth to show nested items in the collection tree. Default:
     * `Infinity`.
     */
    depth?: number;
    /**
     * Summary template for a tree item. Default: `{{title}}`.
     */
    summary?: string;
    /**
     * Whether to include subfolders. Default: `true`.
     */
    subfolders?: boolean;
};
/**
 * Collection meta data’s path options.
 */
export type CollectionMetaDataPath = {
    /**
     * Field type for editing the path name.
     */
    widget?: "string";
    /**
     * Label for the path editor.
     */
    label?: string;
    /**
     * Index file name to be used.
     */
    index_file?: string;
};
/**
 * Collection meta data.
 */
export type CollectionMetaData = {
    /**
     * Entry path options.
     */
    path?: CollectionMetaDataPath;
};
/**
 * Index file inclusion options. See the
 * [documentation](https://sveltiacms.app/en/docs/collections/entries#managing-hugo-s-special-index-file)
 * for details.
 */
export type CollectionIndexFile = {
    /**
     * Index file name without a locale or file extension. Default: `_index`,
     * which is used for Hugo’s special index file.
     */
    name?: string;
    /**
     * Label to be displayed in the editor UI. Default: Index File or its
     * localized version.
     */
    label?: string;
    /**
     * Name of a [Material Symbols
     * icon](https://fonts.google.com/icons?icon.set=Material+Symbols) to be displayed in the editor UI.
     * Default: `home`.
     */
    icon?: string;
    /**
     * Set of fields for the index file. If omitted, the regular entry
     * collection `fields` will be used instead.
     */
    fields?: Field[];
    /**
     * Editor view options.
     */
    editor?: EditorOptions;
};
/**
 * A divider in the collection list and singleton list. See the
 * [documentation](https://sveltiacms.app/en/docs/collections#dividers) for details.
 */
export type CollectionDivider = {
    /**
     * Unique identifier for the divider. Can be omitted, but it must be
     * unique across all the collections and singletons. This property is included here because in the
     * previous version of Sveltia CMS, a divider was defined as a collection with the `divider` option
     * set to `true`, and the `name` option was required.
     */
    name?: string;
    /**
     * Whether to make this collection a divider UI in the collection list.
     * It must be `true` to be used as a divider.
     */
    divider: boolean;
};
/**
 * Common collection properties.
 */
export type CommonCollectionProps = {
    /**
     * Unique identifier for the collection.
     */
    name: string;
    /**
     * Label of the field to be displayed in the editor UI. Default: `name`
     * option value.
     */
    label?: string;
    /**
     * Singular UI label. It will be Blog Post if the `label` is
     * Blog Posts, for example. Default: `label` option value.
     */
    label_singular?: string;
    /**
     * Short description of the collection to be displayed in the
     * editor UI.
     */
    description?: string;
    /**
     * Name of a [Material Symbols
     * icon](https://fonts.google.com/icons?icon.set=Material+Symbols) to be displayed in the collection
     * list.
     */
    icon?: string;
    /**
     * Internal media folder path for the collection. This overrides
     * the global `media_folder` option. It can be a relative path from the project root if it starts
     * with a slash. Otherwise it’s a path relative to the entry. If this option is omitted, the global
     * `media_folder` option value is used. See the
     * [documentation](https://sveltiacms.app/en/docs/media/internal#collection-level-configuration) for
     * details.
     */
    media_folder?: string;
    /**
     * Public media folder path for an entry collection. This
     * overrides the global `public_folder` option. Default: `media_folder` option value.
     */
    public_folder?: string;
    /**
     * Whether to hide the collection in the UI. Default: `false`.
     */
    hide?: boolean;
    /**
     * Whether to show the publishing control UI for Editorial Workflow.
     * Default: `true`. Note that Editorial Workflow is not yet supported in Sveltia CMS.
     */
    publish?: boolean;
    /**
     * File format. It should match the file extension. Default:
     * `yaml-frontmatter`.
     */
    format?: FileFormat;
    /**
     * Delimiters to be used for the front matter
     * format. Default: depends on the front matter type.
     */
    frontmatter_delimiter?: string | string[];
    /**
     * I18n options. Default: `false`.
     */
    i18n?: I18nOptions | boolean;
    /**
     * Preview URL path template.
     */
    preview_path?: string;
    /**
     * Date field name used for `preview_path`.
     */
    preview_path_date_field?: string;
    /**
     * Editor view options.
     */
    editor?: EditorOptions;
    /**
     * Whether to double-quote all the strings values if the YAML
     * format is used for file output. Default: `false`.
     * @deprecated Use the global YAML format options. `yaml_quote: true` is equivalent to `quote:
     * double`. See the documentation https://sveltiacms.app/en/docs/data-output#controlling-data-output
     * for details.
     */
    yaml_quote?: boolean;
};
/**
 * Entry collection properties.
 */
export type EntryCollectionProps = {
    /**
     * Base folder path relative to the project root. It can contain slashes
     * to create subfolders.
     */
    folder: string;
    /**
     * Set of fields to be included in entries.
     */
    fields: Field[];
    /**
     * File path relative to `folder`, without a file extension. It can
     * contain slashes to create subfolders. Default: `{{slug}}`. To use Hugo’s page bundle, set this to
     * `{{slug}}/index`.
     */
    path?: string;
    /**
     * Entry filter.
     */
    filter?: CollectionFilter;
    /**
     * Whether to allow users to create entries in the collection. Default:
     * `true`. Note that the default value is `false` in Netlify/Decap CMS, whereas Sveltia CMS sets it
     * to `true` to provide a better out-of-the-box experience.
     */
    create?: boolean;
    /**
     * Whether to allow users to delete entries in the collection. Default:
     * `true`.
     */
    delete?: boolean;
    /**
     * File extension. Default: `md`.
     */
    extension?: FileExtension;
    /**
     * Field name to be used as the title and slug of an
     * entry. Default: `title`.
     */
    identifier_field?: FieldKeyPath;
    /**
     * Item slug template. Default: `identifier_field` option value. It cannot
     * contain slashes; to organize entries in subfolders, use the `path` option instead. It’s possible
     * to [localize the slug](https://sveltiacms.app/en/docs/i18n#localizing-entry-slugs) or [use a
     * random ID](https://sveltiacms.app/en/docs/collections/entries#slug-template-tags). Also, it’s
     * possible to show a special slug editor field in initial entry drafts by using `{{fields._slug}}`
     * (with an underscore prefix) or `{{fields._slug | localize}}` (to localize the slug).
     */
    slug?: string;
    /**
     * The maximum number of characters allowed for an entry slug.
     * Default: `Infinity`.
     * @deprecated Use the global `slug.maxlength` option instead.
     */
    slug_length?: number;
    /**
     * Entry summary template. Default: `identifier_field`.
     */
    summary?: string;
    /**
     * Custom sortable fields. Default:
     * `title`, `name`, `date`, `author` and `description`. For a Git backend, commit author and commit
     * date are also included by default. See the
     * [documentation](https://sveltiacms.app/en/docs/collections/entries#sorting) for details.
     */
    sortable_fields?: FieldKeyPath[] | SortableFields;
    /**
     * View filters to be used in the entry list.
     */
    view_filters?: ViewFilter[] | ViewFilters;
    /**
     * View groups to be used in the entry list.
     */
    view_groups?: ViewGroup[] | ViewGroups;
    /**
     * Options for a nested collection. Note that nested
     * collections are not yet supported in Sveltia CMS.
     */
    nested?: NestedCollectionOptions;
    /**
     * Meta data for a nested collection. Note that nested
     * collections are not yet supported in Sveltia CMS.
     */
    meta?: CollectionMetaData;
    /**
     * Index file inclusion options. If `true`,
     * the default index file name is `_index`, which is used for Hugo’s special index file. See the
     * [documentation](https://sveltiacms.app/en/docs/collections/entries#managing-hugo-s-special-index-file)
     * for details.
     */
    index_file?: CollectionIndexFile | boolean;
    /**
     * Whether to show entry thumbnails
     * in the entry list. Default: `true` (auto-detect image/file fields). Set to `false` to disable, or
     * provide a field key path (e.g., `heroImage.src`) or an array of paths for fallbacks. Supports
     * nested fields with dot notation and wildcards (e.g., `images.*.src`). An empty array equals
     * `false`.
     */
    thumbnail?: boolean | FieldKeyPath | FieldKeyPath[];
    /**
     * The maximum number of entries that can be created in the collection.
     * Default: `Infinity`.
     */
    limit?: number;
};
/**
 * Entry collection definition. In Netlify/Decap CMS, an entry collection is called a folder
 * collection.
 */
export type EntryCollection = CommonCollectionProps & EntryCollectionProps;
/**
 * File collection properties.
 */
export type FileCollectionProps = {
    /**
     * A set of files.
     */
    files: CollectionFile[];
};
/**
 * File collection definition.
 */
export type FileCollection = CommonCollectionProps & FileCollectionProps;
/**
 * Collection definition.
 */
export type Collection = EntryCollection | FileCollection;
/**
 * Supported Git backend name.
 */
export type GitBackendName = "github" | "gitlab" | "gitea";
/**
 * Supported backend name.
 */
export type BackendName = GitBackendName | "test-repo";
/**
 * Custom commit messages.
 */
export type CommitMessages = {
    /**
     * Message to be used when a new entry is created.
     */
    create?: string;
    /**
     * Message to be used when existing entries are updated.
     */
    update?: string;
    /**
     * Message to be used when existing entries are deleted.
     */
    delete?: string;
    /**
     * Message to be used when new files are uploaded/updated.
     */
    uploadMedia?: string;
    /**
     * Message to be used when existing files are deleted.
     */
    deleteMedia?: string;
    /**
     * Message to be used when committed via a forked repository.
     */
    openAuthoring?: string;
};
/**
 * Git backend properties.
 */
export type GitBackendProps = {
    /**
     * Git branch name. If omitted, the default branch, usually `main` or
     * `master`, will be automatically detected and used.
     */
    branch?: string;
    /**
     * Site domain used for OAuth, which will be included in the
     * `site_id` param to be sent to the API endpoint. Default: [current
     * hostname](https://developer.mozilla.org/en-US/docs/Web/API/Location/hostname) (or
     * `cms.netlify.com` on `localhost`).
     */
    site_domain?: string;
    /**
     * Custom commit messages.
     */
    commit_messages?: CommitMessages;
    /**
     * Whether to enable or disable automatic deployments
     * with any connected CI/CD provider. Default: `undefined`.
     * @deprecated Use the new `skip_ci` option instead, which is more intuitive.
     * `automatic_deployments: false` is equivalent to `skip_ci: true`, and `automatic_deployments:
     * true` is equivalent to `skip_ci: false`. See the documentation
     * https://sveltiacms.app/en/docs/deployments#disabling-automatic-deployments for details.
     */
    automatic_deployments?: boolean;
    /**
     * Whether to enable or disable automatic deployments with any
     * connected CI/CD provider, such as GitHub Actions or Cloudflare Pages. If `true`, the `[skip ci]`
     * prefix will be added to commit messages. Default: `undefined`. See the
     * [documentation](https://sveltiacms.app/en/docs/deployments#disabling-automatic-deployments) for
     * details.
     */
    skip_ci?: boolean;
};
/**
 * GitHub backend properties.
 */
export type GitHubBackendProps = {
    /**
     * Backend name.
     */
    name: "github";
    /**
     * Repository identifier: organization/user name and repository name joined
     * by a slash, e.g. `owner/repo`.
     */
    repo: string;
    /**
     * REST API endpoint for the backend. Required when using GitHub
     * Enterprise Server. Default: `https://api.github.com`.
     */
    api_root?: string;
    /**
     * GraphQL API endpoint for the backend. Default: inferred
     * from `api_root` option value.
     */
    graphql_api_root?: string;
    /**
     * OAuth base URL origin. Required when using an OAuth client other
     * than Netlify, including [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth).
     * Default: `https://api.netlify.com`.
     */
    base_url?: string;
    /**
     * OAuth grant type. The default is an empty string, which is
     * authorization code grant. `pkce` is not yet supported.
     */
    auth_type?: "" | "pkce";
    /**
     * OAuth base URL path. Default: `auth`.
     */
    auth_endpoint?: string;
    /**
     * OAuth application ID. Required when using PKCE authorization.
     */
    app_id?: string;
    /**
     * Pull request label prefix for Editorial Workflow. Default:
     * `sveltia-cms/`. Note that Editorial Workflow is not yet supported in Sveltia CMS.
     */
    cms_label_prefix?: string;
    /**
     * Whether to use squash marge for Editorial Workflow. Default:
     * `false`. Note that Editorial Workflow is not yet supported in Sveltia CMS.
     */
    squash_merges?: boolean;
    /**
     * Deploy preview link context.
     */
    preview_context?: string;
    /**
     * Whether to use Open Authoring. Default: `false`. Note that
     * Open Authoring is not yet supported in Sveltia CMS.
     */
    open_authoring?: boolean;
    /**
     * Authentication scope for Open Authoring.
     */
    auth_scope?: "repo" | "public_repo";
};
/**
 * GitHub backend.
 */
export type GitHubBackend = GitBackendProps & GitHubBackendProps;
/**
 * GitLab backend properties.
 */
export type GitLabBackendProps = {
    /**
     * Backend name.
     */
    name: "gitlab";
    /**
     * Repository identifier: namespace and project name joined by a slash, e.g.
     * `group/project` or `group/subgroup/project`.
     */
    repo: string;
    /**
     * REST API endpoint for the backend. Required when using a
     * self-hosted GitLab instance. Default: `https://gitlab.com/api/v4`.
     */
    api_root?: string;
    /**
     * GraphQL API endpoint for the backend. Default: inferred
     * from `api_root` option value.
     */
    graphql_api_root?: string;
    /**
     * OAuth base URL origin. Required when using an OAuth client other
     * than Netlify, including [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth).
     * Default: `https://gitlab.com`.
     */
    base_url?: string;
    /**
     * OAuth grant type. The default is an empty string, which is
     * authorization code grant. `pkce` is recommended for better security and easier setup. `implicit`
     * is not supported in Sveltia CMS.
     */
    auth_type?: "" | "pkce";
    /**
     * OAuth base URL path. Default: `oauth/authorize`.
     */
    auth_endpoint?: string;
    /**
     * OAuth application ID. Required when using PKCE authorization.
     */
    app_id?: string;
    /**
     * Pull request label prefix for Editorial Workflow. Default:
     * `sveltia-cms/`. Note that Editorial Workflow is not yet supported in Sveltia CMS.
     */
    cms_label_prefix?: string;
    /**
     * Whether to use squash marge for Editorial Workflow. Default:
     * `false`. Note that Editorial Workflow is not yet supported in Sveltia CMS.
     */
    squash_merges?: boolean;
};
/**
 * GitLab backend.
 */
export type GitLabBackend = GitBackendProps & GitLabBackendProps;
/**
 * Gitea/Forgejo backend properties.
 */
export type GiteaBackendProps = {
    /**
     * Backend name.
     */
    name: "gitea";
    /**
     * Repository identifier: organization/user name and repository name joined
     * by a slash, e.g. `owner/repo`.
     */
    repo: string;
    /**
     * REST API endpoint for the backend. Required when using a
     * self-hosted Gitea/Forgejo instance. Default: `https://gitea.com/api/v1`.
     */
    api_root?: string;
    /**
     * OAuth base URL origin. Required when using an OAuth client other
     * than Netlify, including [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth).
     * Default: `https://gitea.com/`.
     */
    base_url?: string;
    /**
     * OAuth base URL path. Default: `login/oauth/authorize`.
     */
    auth_endpoint?: string;
    /**
     * OAuth application ID.
     */
    app_id: string;
};
/**
 * Gitea/Forgejo backend.
 */
export type GiteaBackend = GitBackendProps & GiteaBackendProps;
/**
 * Git-based backend.
 */
export type GitBackend = GitHubBackend | GitLabBackend | GiteaBackend;
/**
 * Test backend.
 */
export type TestBackend = {
    /**
     * Backend name.
     */
    name: "test-repo";
};
/**
 * Backend options.
 */
export type Backend = GitBackend | TestBackend;
/**
 * Global media storage options.
 */
export type GlobalMediaLibraryOptions = {
    /**
     * Library name.
     */
    name: MediaLibraryName;
};
/**
 * Custom logo options.
 */
export type LogoOptions = {
    /**
     * Absolute URL or absolute path to the site logo that will be displayed on
     * the entrance page and the browser’s tab (favicon). A square image works best.
     */
    src: string;
    /**
     * Whether to show the logo in the header. Default: `true`.
     */
    show_in_header?: boolean;
};
/**
 * Entry slug options.
 */
export type SlugOptions = {
    /**
     * Encoding option. Default: `unicode`.
     */
    encoding?: "unicode" | "ascii";
    /**
     * Whether to remove accents. Default: `false`.
     */
    clean_accents?: boolean;
    /**
     * String to replace sanitized characters. Default: `-`.
     */
    sanitize_replacement?: string;
    /**
     * The maximum number of characters allowed for an entry slug.
     * Default: `Infinity`.
     */
    maxlength?: number;
    /**
     * Whether to trim leading and trailing replacement characters. Default:
     * `true`.
     */
    trim?: boolean;
    /**
     * Whether to convert the slug to lowercase. Default: `true`.
     */
    lowercase?: boolean;
};
/**
 * JSON format options.
 */
export type JsonFormatOptions = {
    /**
     * Indent style. Default: 'space'.
     */
    indent_style?: "space" | "tab";
    /**
     * Indent size. Default: `2`.
     */
    indent_size?: number;
};
/**
 * YAML format options.
 */
export type YamlFormatOptions = {
    /**
     * Indent size. Default: `2`.
     */
    indent_size?: number;
    /**
     * Whether to indent block sequences. Default: `true`.
     */
    indent_sequences?: boolean;
    /**
     * String value’s default quote type. Default:
     * 'none'.
     */
    quote?: "none" | "single" | "double";
};
/**
 * Data output options. See the
 * [documentation](https://sveltiacms.app/en/docs/data-output#controlling-data-output) for details.
 */
export type OutputOptions = {
    /**
     * Whether to prevent fields with `required: false`
     * and an empty value from being included in entry data output. Default: `false`.
     */
    omit_empty_optional_fields?: boolean;
    /**
     * Whether to encode the file path in File/Image fields.
     * Default: `false`. This is useful when a file path contains special characters that need to be
     * URL-encoded, such as spaces and parentheses. For example, `Hello World (1).webp` would be
     * `Hello%20World%20%281%29.webp`. In general, File/Image fields should contain the original file
     * path, and web-specific encoding should be done in the front-end code.
     */
    encode_file_path?: boolean;
    /**
     * JSON format options.
     */
    json?: JsonFormatOptions;
    /**
     * YAML format options.
     */
    yaml?: YamlFormatOptions;
};
/**
 * CMS configuration.
 */
export type CmsConfig = {
    /**
     * Whether to load YAML/JSON CMS configuration file(s) when
     * [manually initializing the CMS](https://sveltiacms.app/en/docs/api/initialization). This works
     * only in the `CMS.init()` method’s `config` option. Default: `true`.
     */
    load_config_file?: boolean;
    /**
     * Backend options.
     */
    backend: Backend;
    /**
     * Publish mode. An empty string is
     * the same as `simple`. Default: `simple`. Note that Editorial Workflow is not yet supported in
     * Sveltia CMS.
     */
    publish_mode?: "" | "simple" | "editorial_workflow";
    /**
     * Global internal media folder path, relative to the project’s
     * root directory. Required unless a cloud media storage is configured.
     */
    media_folder?: string;
    /**
     * Global public media folder path, relative to the project’s
     * public URL. It must be an absolute path starting with `/`. Default: `media_folder` option value.
     */
    public_folder?: string;
    /**
     * Legacy media storage option
     * that allows only one library. This overrides the global `media_library` option. Use
     * `media_libraries` instead to support multiple storage providers.
     */
    media_library?: MediaLibrary & GlobalMediaLibraryOptions;
    /**
     * Unified media storage option that supports multiple
     * libraries. See the [documentation](https://sveltiacms.app/en/docs/media#configuration) for
     * details.
     */
    media_libraries?: MediaLibraries;
    /**
     * Site URL. Default: current site’s origin
     * ([`location.origin`](https://developer.mozilla.org/en-US/docs/Web/API/Location/origin)).
     */
    site_url?: string;
    /**
     * Site URL linked from the UI. Default: `site_url` option value.
     */
    display_url?: string;
    /**
     * Absolute URL or absolute path to the site logo that will be
     * displayed on the entrance page and the browser’s tab (favicon). A square image works best.
     * Default: Sveltia logo.
     * @deprecated This option is superseded by the new `logo.src` option. See the documentation
     * https://sveltiacms.app/en/docs/customization#custom-logo for details.
     */
    logo_url?: string;
    /**
     * Site logo options.
     */
    logo?: LogoOptions;
    /**
     * URL to redirect users to after logging out.
     */
    logout_redirect_url?: string;
    /**
     * Whether to show site preview links. Default: `true`.
     */
    show_preview_links?: boolean;
    /**
     * Entry slug options.
     */
    slug?: SlugOptions;
    /**
     * Set of collections. The list can
     * also contain dividers, which are used to group collections in the collection list. Either
     * `collections` or `singletons` option must be defined.
     */
    collections?: (Collection | CollectionDivider)[];
    /**
     * Set of singleton files, such as
     * the CMS configuration file or the homepage file. They are not part of any collection and can be
     * accessed directly through the collection list. The list can also contain dividers. See the
     * [documentation](https://sveltiacms.app/en/docs/collections/singletons) for details.
     */
    singletons?: (CollectionFile | CollectionDivider)[];
    /**
     * Global i18n options.
     */
    i18n?: I18nOptions;
    /**
     * Editor view options.
     */
    editor?: EditorOptions;
    /**
     * Data output options. See the
     * [documentation](https://sveltiacms.app/en/docs/data-output#controlling-data-output) for details.
     */
    output?: OutputOptions;
};
/**
 * Entry file Parser.
 */
export type FileParser = (text: string) => any | Promise<any>;
/**
 * Entry file formatter.
 */
export type FileFormatter = (value: any) => string | Promise<string>;
/**
 * Custom rich text editor component options.
 */
export type EditorComponentDefinition = {
    /**
     * Unique identifier for the component.
     */
    id: string;
    /**
     * Label of the component to be displayed in the editor UI.
     */
    label: string;
    /**
     * Name of a [Material Symbols
     * icon](https://fonts.google.com/icons?icon.set=Material+Symbols) to be displayed in the editor UI.
     */
    icon?: string;
    /**
     * Whether to collapse the object by default. Default: `false`.
     */
    collapsed?: boolean;
    /**
     * Set of fields to be displayed in the component.
     */
    fields: Field[];
    /**
     * Regular expression to search a block from Markdown document.
     */
    pattern: RegExp;
    /**
     * Function to convert
     * the matching result to field properties. This can be omitted if the `pattern` regex contains
     * named capturing group(s) that will be passed directly to the internal `createNode` method.
     */
    fromBlock?: (match: RegExpMatchArray) => {
        [key: string]: any;
    };
    /**
     * Function to convert field
     * properties to Markdown content.
     */
    toBlock: (props: {
        [key: string]: any;
    }) => string;
    /**
     * Function to
     * convert field properties to field preview.
     */
    toPreview?: (props: {
        [key: string]: any;
    }) => string | JSX.Element;
};
/**
 * Supported event type.
 */
export type AppEventType = "prePublish" | "postPublish" | "preUnpublish" | "postUnpublish" | "preSave" | "postSave";
/**
 * Author information for an event.
 */
export type AppEventAuthor = {
    /**
     * Author login name.
     */
    login?: string;
    /**
     * Author display name.
     */
    name?: string;
};
/**
 * Event entry media file data.
 */
export type AppEventEntryMedia = {
    /**
     * Media file ID.
     */
    id: string;
    /**
     * Media file path.
     */
    path: string;
    /**
     * Media file name.
     */
    name: string;
    /**
     * Media file URL.
     */
    url: string;
    /**
     * Media file display URL.
     */
    displayURL: string;
    /**
     * Media file size in bytes.
     */
    size: number;
    /**
     * Media file object.
     */
    file: File;
};
/**
 * Event entry data.
 */
export type AppEventEntry = {
    /**
     * Entry data for the default locale.
     */
    data: Record<string, any>;
    /**
     * Entry data for other locales with locale codes as keys.
     */
    i18n: Record<string, any>;
    /**
     * Entry slug.
     */
    slug: string;
    /**
     * Entry file path.
     */
    path: string;
    /**
     * Whether the entry is newly created.
     */
    newRecord: boolean;
    /**
     * Name of the collection.
     */
    collection: string;
    /**
     * List of media files associated with the entry.
     */
    mediaFiles: AppEventEntryMedia[];
    /**
     * Entry meta data.
     */
    meta: {
        path: string;
    };
    /**
     * Unknown. Always `null`.
     */
    isModification: null;
    /**
     * Unknown. Always `null`.
     */
    label: null;
    /**
     * Unknown. Always `false`.
     */
    partial: boolean;
    /**
     * Unknown. Always an empty string.
     */
    author: string;
    /**
     * Unknown. Always an empty string.
     */
    raw: string;
    /**
     * Unknown. Always an empty string.
     */
    status: string;
    /**
     * Unknown. Always an empty string.
     */
    updatedOn: string;
};
/**
 * Event listener properties.
 */
export type AppEventListener = {
    /**
     * Event type.
     */
    name: AppEventType;
    /**
     * Event handler. For
     * the `preSave` event, the handler can return a modified entry object in Immutable Map format to
     * change the data before it is saved. For other events, the return value is ignored.
     */
    handler: (args: {
        author: AppEventAuthor;
        entry: MapOf<AppEventEntry>;
    }) => void | MapOf<AppEventEntry> | Promise<void> | Promise<MapOf<AppEventEntry>>;
};
export type CustomPreviewTemplateProps = {
    entry: Record<string, any>;
    widgetFor: (name: string) => any;
    widgetsFor: (name: string) => any;
    getAsset: (name: string) => any;
    getCollection: (collectionName: string, slug?: string) => any;
    document: Document;
    window: Window;
};
export type CustomFieldControlProps = {
    value: any;
    field: Record<string, any>;
    forID: string;
    classNameWrapper: string;
    onChange: (value: any) => void;
};
export type CustomFieldPreviewProps = {
    value: any;
    field: Record<string, any>;
    metadata: Record<string, any>;
    entry: Record<string, any>;
    getAsset: (name: string) => any;
    fieldsMetaData: Record<string, any>;
};
export type CustomFieldSchema = {
    properties: Record<string, any>;
};
import type { JSX } from 'react';
import type { MapOf } from 'immutable';
