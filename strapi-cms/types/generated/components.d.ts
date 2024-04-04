import type { Schema, Attribute } from '@strapi/strapi';

export interface SocialmediaSocialMedia extends Schema.Component {
  collectionName: 'components_socialmedia_social_medias';
  info: {
    displayName: 'social media';
    description: '';
  };
  attributes: {
    media: Attribute.Enumeration<
      ['facebook', 'linkedin', 'youtube', 'twitter']
    > &
      Attribute.Required;
    url: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'socialmedia.social-media': SocialmediaSocialMedia;
    }
  }
}
