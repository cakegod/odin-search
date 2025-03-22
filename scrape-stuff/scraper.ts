import { writeFile } from "node:fs/promises";
import axios from "axios";
import * as cheerio from "cheerio";

const COURSES_URL = [
	"https://www.theodinproject.com/paths/foundations/courses/foundations",
	"https://www.theodinproject.com/paths/full-stack-javascript/courses/intermediate-html-and-css",
	"https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript",
	"https://www.theodinproject.com/paths/full-stack-javascript/courses/advanced-html-and-css",
	"https://www.theodinproject.com/paths/full-stack-javascript/courses/react",
	"https://www.theodinproject.com/paths/full-stack-javascript/courses/databases",
	"https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs",
	"https://www.theodinproject.com/paths/full-stack-javascript/courses/getting-hired",
	"https://www.theodinproject.com/paths/full-stack-ruby-on-rails/courses/ruby",
	"https://www.theodinproject.com/paths/full-stack-ruby-on-rails/courses/ruby-on-rails",
];

console.time("scrapeOdinLessons");

async function scrapCourse(courseUrl: string) {
	console.log(`Fetching ${courseUrl}...`);
	const { data } = await axios(courseUrl);
	const $ = cheerio.load(data);

	console.log("Extracting links...");
	return $.extract({
		course: [
			{
				selector: "[data-test-id='course-section'] > div",
				value: {
					title: {
						value: "innerText",
						selector: "p",
					},
					link: {
						selector: "a",
						value: "href",
					},
				},
			},
		],
	}).course;
}

const links = await Promise.all(COURSES_URL.map(scrapCourse));

console.log("Storing links...");
await writeFile("odin-data.json", JSON.stringify(links.flat(), null, 2));
console.timeEnd("scrapeOdinLessons");
