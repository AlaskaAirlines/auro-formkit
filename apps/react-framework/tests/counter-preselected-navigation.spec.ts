import {
  counterGroupPreselectedNavigationSuite,
  singleCounterPreselectedNavigationSuite,
  DEFAULT_GROUP_VALUES,
} from '../../shared/counter-preselected-navigation.suite';

counterGroupPreselectedNavigationSuite('React', {
  navigateRoute: '/counter-remount-navigate',
  targetRoute: '/counter-remount',
  initialValues: DEFAULT_GROUP_VALUES,
});

singleCounterPreselectedNavigationSuite('React', {
  navigateRoute: '/single-counter-remount-navigate',
  targetRoute: '/single-counter-remount',
  initialValue: 3,
});
