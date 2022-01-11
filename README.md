<p align="center">
  <a href="http://console.foxfamily.io/page/#"  target="_blank">
    <img src="http://www.foxpage.io/dist/logo-s.png" width="60px" alt="Foxpage logo" />
  </a>
</p>
<h4 align="center">Low-code, made simple and fast</h4>
<p align="center"><a href="http://console.foxfamily.io/page/#/" target="_blank">Try live demo</a></p>
<br />

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D14.15.1-brightgreen" alt="Node Version" />
  <img src="https://img.shields.io/badge/typescript-%3E%3D4.3.0-brightgreen" alt="Typescript Version" />
  <img src="https://img.shields.io/badge/yarn-1.22.5-blue" alt="Yarn Version" />
</p>

Foxpage is a lightweight front-end low-code framework.

## Features

- 🖥️ **Visualization**. Provides visual page editing, what you see is what you get.
- 🏷️ **Componentized**. Provide a relatively complete component production process and componentization scheme, and the production of pages starts with the production of components.
- 📋 **Scalable**. Strong scalability both at the technical level and at the business level.
- 🌍 **Globalization**. Provide a set of international content management solutions.
- 📡 **Platform**. Provides an online cooperation platform for developers, editors, operations, etc.

## Project

```txt
<Project Root>
  ├── packages
  |   ├─foxpage-admin                // foxpage portal
  │   ├─foxpage-server               // foxpage server
  │   ├─foxpage-server-types         // foxpage types
  │   ├─foxpage-plugin-aws-s3        // foxpage aws s3 plugin
  │   ├─foxpage-plugin-ares          // foxpage ares plugin
  │   ├─foxpage-plugin-unpkg         // foxpage unpkg plugin
```

## Getting Started

<a href="http://www.foxpage.io/#/guide" target="_blank">Read the Getting Started tutorial</a> or follow the steps below:

### ⏳ Installation

- (Use **yarn** to install the Foxpage (recommended). [Install yarn with these docs](https://yarnpkg.com/lang/en/docs/install/).)

```bash
yarn boot
```

##### Start Server

```bash
npm run start-server:prod

# after server start, run install script to init data
npm run init-server:prod

```

##### Start Portal

```bash
npm run start-admin:prod
```

### 🖐 Requirements

**Node:**

- NodeJS >= 14.15.1 <= 16.x
- NPM >= 6.14.x

**Database:**

- MongoDB >= 5.0.2
- Mongoose >= 5.12.14

**We recommend always using the latest version of Foxpage to start your new projects**.

## Contributing

Please read our [Contributing Guide](http://www.foxpage.io/#/guide/contribute) before submitting a Pull Request to the project.

## Community support

For general help using Foxpage, please refer to [the official Foxpage documentation](http://www.foxpage.io). For additional help, you can use one of these channels to ask a question:

- [GitHub](https://github.com/foxpage/foxpage) (Bug reports, Contributions)

## Documentation

See our documentation live [Docs](http://www.foxpage.io) for the Foxpage Server.

- [Developer docs](http://www.foxpage.io/#/developer)
- [User guide](http://www.foxpage.io/#/course)

## Try live demo

See for yourself what's under the hood by getting access to a [Foxpage project](http://console.foxfamily.io/page/#/) with sample data.

## License

See the [LICENSE](./LICENSE) file for licensing information.
