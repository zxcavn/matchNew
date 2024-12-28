const AVAILABLE_LENGTH_REG_EXP = /^.{3,64}$/;
const AVAILABLE_NAME_CHARACTERS_REG_EXP = /^[a-zA-Z0-9]+$/;

export const ROOT_XDS_DOMAIN = 'xfi';

export const isValidXdsNameLabel = (label: string): boolean => {
  return AVAILABLE_NAME_CHARACTERS_REG_EXP.test(label) && AVAILABLE_LENGTH_REG_EXP.test(label);
};

export const isValidXdsName = (name: string): boolean => {
  const chunks = name.split('.');
  const label = chunks.slice(0, chunks.length - 1).join('');

  return chunks.length > 1 && chunks.at(-1) === ROOT_XDS_DOMAIN && isValidXdsNameLabel(label);
};

type NormalizeNameResult = {
  /**
   * @description label without domain
   * @example `name`
   */
  label: string;
  /**
   * @description full name with domain
   * @example `name.xfi`
   */
  name: string;
} | null;

export const normalizeXdsName = (nameOrLabelParam: string): NormalizeNameResult => {
  const root = `.${ROOT_XDS_DOMAIN}`;
  const nameOrLabel = nameOrLabelParam.toLowerCase();
  const label = nameOrLabel.endsWith(root) ? nameOrLabel.slice(0, nameOrLabel.length - root.length) : nameOrLabel;

  if (!isValidXdsNameLabel(label)) {
    return null;
  }

  return {
    label,
    name: [label, root].join(''),
  };
};
