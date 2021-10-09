<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="https://raw.githubusercontent.com/othneildrew/Best-README-Template/master/images/logo.png" alt="Logo" width="80" height="80">

  <h3 align="center">Linux network namespace</h3>

  <p align="center">
    NetNS-CLI is a small CLI to create network namespaces and bridge them together with a single command
    <br />
    <a href="https://adil.medium.com/container-networking-under-the-hood-network-namespaces-6b2b8fe8dc2a"><strong>View tutorial »</strong></a>
    <br />
    <br />
  </p>
</div>

## Getting Started

To get a local copy up and running follow these simple example steps.

It's been tested in _Ubuntu 18.04_ and _Ubuntu 20.04_. For _MacOS_ users it won't work becuase MacOS does not support Linux `ip` command.

### Prerequisites

- Node 14.x
- yarn
  ```sh
  npm install -g yarn
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/maykinayki/netns-cli.git
   ```
2. Install packages
   ```sh
   yarn
   ```

### Usage

1. Apply the namespace configuration from YAML file
   ```sh
   yarn run apply PATH_TO_CONFIG_FILE.yaml
   ```
2. Delete the namespace configuration from YAML file
   ```sh
   yarn run delete PATH_TO_CONFIG_FILE.yaml
   ```

### Example

I provied an example yaml file in the root of the project `netns-config.yaml`.
You can use this file as a template to build your own network namespaces.

We can use the `apply` command above to add the namespaces in `netns-config.yaml`

```sh
yarn run apply ./netns-config.yaml
```

### Post namespace creation

If all went well then you might want to attach your terminal to a namespace. I've provided a bash script in `./scripts/switch-netns.sh`. Simply run the command below:

```sh
sudo bash ./scripts/switch-netns.sh
```

It'll prompt you to enter the name of the namespace you want to attach your terminal. After typing the name simply press enter and here you are, in the namespace.
