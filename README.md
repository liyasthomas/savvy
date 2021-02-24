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

Savvy is an scalable serverless customer feedback app - built with AWS Amplify, AWS AppSync, and Amazon DynamoDB.

## About the app

While the voting API is built with DynamoDB and AppSync, the main functionality really is within a single GraphQL resolver that sends an atomic update to DynamoDB.

This atomic update allows the DynamoDB table to stay consistent regardless of the number of other operations that are happening.

### Develope

1. First install and configure the Amplify CLI.

```sh
$ npm install -g @aws-amplify/cli
$ amplify configure
```

2. Clone the repo, install dependencies

```sh
$ git clone https://github.com/liyasthomas/savvy
$ cd this-or-that
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
