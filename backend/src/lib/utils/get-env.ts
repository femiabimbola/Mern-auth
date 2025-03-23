// To delete
export const getEnv2 = (key: string, defaultValue: string = ""): string => {
  const value = process.env[key];

  if (value === undefined) {
    if (defaultValue) return defaultValue;
    throw new Error(`Enviroment variable ${key} is not set`);
  }
  return value;
}; 



export const getEnv = (variableName: string, defaultValue: string = ""): string => {
  const envValue = process.env[variableName];

  if (envValue !== undefined) {
    return envValue; // Return the environment variable if it is set
  }

  if (defaultValue) {
    return defaultValue; // Return the default value if provided
  }

  throw new Error(`Environment variable "${variableName}" is not set.`); // Throw an error if neither is defined
};
