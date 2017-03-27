import { SuperheroiPage } from './app.po';

describe('superheroi App', () => {
  let page: SuperheroiPage;

  beforeEach(() => {
    page = new SuperheroiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
