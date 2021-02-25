<div align="center">
  <a href="https://master.dup21zsuytyqn.amplifyapp.com"><img src="savvy.png" alt="Savvy" height="128"></a>
  <br>
  <br>
  <p>
    <b>Savvy - Build better products with customer feedback</b>
  </p>
  <p>
    <sub>Made with ♥ and <a href="https://aws.amazon.com/amplify">AWS Amplify</a> by
      <a href="https://github.com/liyasthomas">liyasthomas</a>
    </sub>
  </p>
</div>

---

## About the app

Savvy is a scalable serverless customer feedback app - built with AWS Amplify, AWS AppSync, and Amazon DynamoDB on [AWS Amplify Hackathon by Hashnode](https://townhall.hashnode.com/announcing-aws-amplify-hackathon-on-hashnode).

### Develop

1. First install and configure the Amplify CLI.

```sh
$ npm install -g @aws-amplify/cli
$ amplify configure
```

2. Clone the repo, install dependencies

```sh
$ git clone https://github.com/liyasthomas/savvy
$ cd savvy
$ npm install
```

3. Initialize the app

```sh
$ amplify init

? Enter a name for the environment: (your preferred env name)
? Choose your default editor: (your preferred editor)
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use: your-profile-name

? Do you want to configure Lambda Triggers for Cognito? No
```

4. Deploy the back end

```sh
$ amplify push --y
```

5. Run the app

```sh
$ npm start
```

## Deploy

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/liyasthomas/savvy)
