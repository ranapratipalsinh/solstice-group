import type { Schema, Struct } from '@strapi/strapi';

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'share-alt';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      [
        'facebook',
        'instagram',
        'twitter',
        'linkedin',
        'youtube',
        'whatsapp',
        'other',
      ]
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedValue extends Struct.ComponentSchema {
  collectionName: 'components_shared_values';
  info: {
    displayName: 'Value';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<
      ['handshake', 'award', 'lightbulb', 'users', 'leaf', 'sparkles']
    > &
      Schema.Attribute.DefaultTo<'sparkles'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.social-link': SharedSocialLink;
      'shared.value': SharedValue;
    }
  }
}
