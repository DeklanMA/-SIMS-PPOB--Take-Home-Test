import {type RouteConfig, index, route, layout} from '@react-router/dev/routes';

export default [

  layout('./routes/_auth.tsx', [
    route('login', './routes/login.tsx'),
    route('register', './routes/register.tsx'),
  ]),

  layout('./routes/_protected.tsx', [
    index('./routes/index.tsx'), // /
    route('service/:code', './routes/service.$code.tsx'),
    route('topup', './routes/topup.tsx'),
    route('transactions', './routes/transactions.tsx'),
    route("account", "./routes/account.tsx"),
  ]),
] satisfies RouteConfig;
