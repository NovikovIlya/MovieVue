/**
 *  @vitest-enviroment happe-dom
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import FavoriteList from './FavoritesList.vue'

describe('FavoriteList test', () => {
  it('should render', () => {
    const wrapper = mount(FavoriteList);
    expect(wrapper.find('ul').exists()).toBeTruthy()
  });
});
