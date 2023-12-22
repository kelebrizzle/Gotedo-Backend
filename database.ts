import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

mysql: {
  client: 'mysql2',
  connection: {
    host: Env.get('MYSQL_HOST'),
    port: Env.get('MYSQL_PORT'),
    user: Env.get('MYSQL_USER'),
    password: Env.get('MYSQL_PASSWORD', ''),
    database: Env.get('MYSQL_DB_NAME'),
  },
  migrations: {
    naturalSort: true,
  },
  healthCheck: false,
  debug: false,
}
