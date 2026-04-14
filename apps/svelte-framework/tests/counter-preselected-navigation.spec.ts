import {
  counterGroupPreselectedNavigationSuite,
  singleCounterPreselectedNavigationSuite,
  DEFAULT_GROUP_VALUES,
} from '../../shared/counter-preselected-navigation.suite';

counterGroupPreselectedNavigationSuite('Svelte', {
  navigateRoute: '/counter-remount-navigate',
  targetRoute: '/counter-remount',
  initialValues: DEFAULT_GROUP_VALUES,
});

singleCounterPreselectedNavigationSuite('Svelte', {
  navigateRoute: '/single-counter-remount-navigate',
  targetRoute: '/single-counter-remount',
  initialValue: 3,
});
