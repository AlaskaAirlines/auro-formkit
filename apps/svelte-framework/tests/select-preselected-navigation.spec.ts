import { selectPreselectedNavigationSuite } from '../../shared/select-preselected-navigation.suite';

selectPreselectedNavigationSuite('Svelte', {
  navigateRoute: '/select-remount-navigate',
  targetRoute: '/select-remount',
  initialValue: 'bar',
});

selectPreselectedNavigationSuite('Svelte', {
  navigateRoute: '/select-remount-multiselect-navigate',
  targetRoute: '/select-remount-multiselect',
  initialValue: '["foo","bar"]',
  multiselect: true,
});
