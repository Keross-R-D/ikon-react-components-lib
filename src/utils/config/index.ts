interface ConfigProps {
  IKON_BASE_API_URL: string;
  IKON_PLATFORM_API_URL: string;
  IKON_AUTH_API_URL: string;
  IKON_USER_API_URL: string;
  IKON_ACCOUNT_API_URL: string;
  LOGIN_PAGE_URL: string;
  IKON_PLATFORM_UI_URL: string;
  IKON_PLATFORM_PROFILE_URL: string;
}
export interface IkonConfigProps {
  IKON_BASE_API_URL: string;
  IKON_PLATFORM_UI_URL: string;
  LOGIN_PAGE_URL: string;
}

const config: ConfigProps = {
  IKON_ACCOUNT_API_URL: "",
  IKON_AUTH_API_URL: "",
  IKON_BASE_API_URL: "",
  IKON_PLATFORM_API_URL: "",
  IKON_PLATFORM_PROFILE_URL: "",
  IKON_PLATFORM_UI_URL: "",
  IKON_USER_API_URL: "",
  LOGIN_PAGE_URL: "",
};

export const setIkonConfig = (userConfig: IkonConfigProps) => {
  config.IKON_BASE_API_URL = userConfig.IKON_BASE_API_URL;
  config.IKON_PLATFORM_API_URL = `${userConfig.IKON_BASE_API_URL}/platform`;
  config.IKON_AUTH_API_URL = `${config.IKON_PLATFORM_API_URL}/auth`;
  config.IKON_USER_API_URL = `${config.IKON_PLATFORM_API_URL}/user`;
  config.IKON_ACCOUNT_API_URL = `${config.IKON_PLATFORM_API_URL}/account`;
  config.LOGIN_PAGE_URL = userConfig.LOGIN_PAGE_URL;
  config.IKON_PLATFORM_UI_URL = userConfig.IKON_PLATFORM_UI_URL;
  config.IKON_PLATFORM_PROFILE_URL = `${userConfig.IKON_PLATFORM_UI_URL}/setting/profile`;
};

export const getConfig = () => {
  return config;
};
