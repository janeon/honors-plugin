# Question Enhancer for Stack Overflow 
Built using boilerplate code for [react Chrome Extension](https://medium.com/@satendra02/create-chrome-extension-with-reactjs-using-inject-page-strategy-137650de1f39), this is a tool to help askers construct more answerable questions on Stack Overflow

## Features
- Answerability prediction
- Question enhancement suggestions
- Anwer previews of similar questions

## Features from react Chrome Extension boilerplate
- Used ReactJs to write chrome extension
- Injecting extension to host page as content script
- Utilized the Chrome messaging API
- Isolated extension CSS using Iframe

## Installation
>Make sure you have latest **NodeJs** version installed

Clone repo

```
https://github.com/janeon/honors-plugin.git
```
Run

```
yarn install
```
Now build the extension using
```
yarn build
```
You will see a `build` folder generated inside the repo / project's home directory (honors-plugin)


## Adding the extension to Chrome

In Chrome browser, go to chrome://extensions page and switch on developer mode. This enables the ability to locally install a Chrome extension.

<img src="https://cdn-images-1.medium.com/max/1600/1*OaygCwLSwLakyTqCADbmDw.png" />

Now click on the `LOAD UNPACKED` and browse to `honors-plugin\build` , this will install the app as a Chrome extension.

When you go to any website and click on extension icon, injected page will toggle.

<img src="https://cdn-images-1.medium.com/max/1600/1*bXJYfvrcHDWKwUZCrPI-8w.png" />

## License

The repo is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
