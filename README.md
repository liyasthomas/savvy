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

Savvy is a scalable serverless customer feedback tool for developers, indie hackers, entrepreneurs and startups - built with AWS Amplify, AWS AppSync, and Amazon DynamoDB on [AWS Amplify Hackathon by Hashnode](https://townhall.hashnode.com/announcing-aws-amplify-hackathon-on-hashnode).

### Features

- Capture feedbacks from your customers and public in **one organized place.**

  Give voice to your community, get valuable suggestions and prioritize what they need the most.

- Text and image polls.

- Custom labels for options.

- Self-hostable + scalable + serverless.

  One click deployment to AWA Amplify.

- **Your own domain.**

  When using AWS Amplify hosting service, you can use your own domain and get a free TLS certificate to keep it secure.

- Shareable link for individual feature requests.

  Invite your customers to create, vote and prioritize feedback.

- Dark mode

- Disqus comments.

  Share ideas, vote and discuss.

- Open source.

### Demo

[Savvy](https://master.dup21zsuytyqn.amplifyapp.com/)

### Get started

**How Savvy works**

Three simple steps to understand the workflow.

1. Setup

   Use one-click deploy to AWS Amplify or follow detailed instructions on GitHub repository. Update Discus short name. Customize with your own logo, colors and text.

2. Collect

   Invite your customers to your new Savvy site. They'll be able to suggest new ideas, submit feature requests or report issues they have with your product. Publish your Savvy site on any hosting service to accept public feedbacks.

3. Deliver

   Keep your customers in the loop by responding to their suggestions. Customers will be notified of any new action on their topics of interest. Prioritize feature requests and feedbacks internally.

### Deploy

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/liyasthomas/savvy)

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
