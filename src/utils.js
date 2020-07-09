import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve(__dirname, ".env")}); // 상위 폴더에 .env 파일이 존재하지 않을 경우, 자동으로 불러와지지 않아서 설정 필요

import {adjectives, nouns} from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
    const email = {
        from: "kwonmminji@naver.com",
        to: address,
        subject: "🔒Login Secret for Prismagram🔒",
        html: `Hello! Your login secret is ${secret}.<br/>Copy past on the app/website to log in.`
    };
    return sendMail(email);
}