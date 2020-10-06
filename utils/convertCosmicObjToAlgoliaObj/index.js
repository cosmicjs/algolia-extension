import parseDate from './parseDate';
import parseFile from './parseFile';
import parseHtmlTextArea from './parseHtmlTextArea';
import parseObject from './parseObject';
import parseObjects from './parseObjects';
import parsePlainTextArea from './parsePlainTextArea';
import parseRadioButtons from './parseRadioButtons';
import parseSelectDropdown from './parseSelectDropdown';
import parseText from './parseText';
import parseSwitch from './parseSwitch';
import parseNumber from './parseNumber';
import parseCheckBoxes from './parseCheckBoxes';
import parseMarkdown from './parseMarkdown';

export default (cosmicObject) => {
  const {
    _id,
    content,
    created_at,
    metafields,
    modified_at,
    published_at,
    slug,
    title,
  } = cosmicObject;
  const algoliaObject = {
    objectID: _id,
    content,
    created_at: new Date(created_at).valueOf(),
    modified_at: new Date(modified_at).valueOf(),
    published_at: new Date(published_at).valueOf(),
    slug,
    title,
  };

  metafields.forEach((metafield) => {
    switch (metafield.type) {
      case 'date':
        algoliaObject[metafield.key] = parseDate(metafield);
        break;
      case 'file':
        algoliaObject[metafield.key] = parseFile(metafield);
        break;
      case 'html-textarea':
        algoliaObject[metafield.key] = parseHtmlTextArea(metafield);
        break;
      case 'radio-buttons':
        algoliaObject[metafield.key] = parseRadioButtons(metafield);
        break;
      case 'select-dropdown':
        algoliaObject[metafield.key] = parseSelectDropdown(metafield);
        break;
      case 'text':
        algoliaObject[metafield.key] = parseText(metafield);
        break;
      case 'textarea':
        algoliaObject[metafield.key] = parsePlainTextArea(metafield);
        break;
      case 'object':
        algoliaObject[metafield.key] = parseObject(metafield);
        break;
      case 'objects':
        algoliaObject[metafield.key] = parseObjects(metafield);
        break;
      case 'switch':
        algoliaObject[metafield.key] = parseSwitch(metafield);
        break;
      case 'number':
        algoliaObject[metafield.key] = parseNumber(metafield);
        break;
      case 'check-boxes':
        algoliaObject[metafield.key] = parseCheckBoxes(metafield);
        break;
      case 'markdown':
        algoliaObject[metafield.key] = parseMarkdown(metafield);
        break;
      default:
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.log(`Metafield type, ${metafield.type}, not implemented yet.`);
        }
    }
  });

  return algoliaObject;
};
