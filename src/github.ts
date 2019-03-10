import { OAuth2Provider, Utils } from '@salte-auth/salte-auth';

export class GitHub extends OAuth2Provider {
  public constructor(config: GitHub.Config) {
    super(config);

    this.config = Utils.Common.defaults(this.config, {
      url: 'https://github.com'
    });
  }

  public get name() {
    return 'github';
  }

  public get login() {
    return `${this.config.url}/login/oauth/authorize`;
  }
}

export interface GitHub {
  config: GitHub.Config;
}

export declare namespace GitHub {
  interface Config extends OAuth2Provider.Config {
    /**
     * The domain of your GitHub Enterprise Instance.
     *
     * @default 'https://github.com'
     */
    url?: string;
  }
}

