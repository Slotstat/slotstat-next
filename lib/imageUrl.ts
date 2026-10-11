// The S3 bucket the backend stores image links for no longer exists. The
// artwork for those links is shipped with the site instead, under
// /public/game-images/<id>.png, where <id> is the file name of the old link.
const DEAD_PREFIX = "https://s3.eu-central-1.amazonaws.com/slotstat.net/images/";
const SITE_URL = "https://slotstat.net";

const LOCAL_IDS = new Set([
  "00aa196c-fb63-4188-93e5-ec0c5ac6ec0f",
  "0129cc89-12e5-4e12-984e-a3f80ec482c3",
  "0ad8f9cd-003e-44f2-bc93-8dc873b365df",
  "0b185aa6-240c-491b-a011-d92bfcf33596",
  "10bf95c6-873d-421b-88bf-7ed8fe69b084",
  "12825ea2-88c3-4c86-9b7c-4e7cd14c4248",
  "29f04827-8a24-49e8-9492-837646a587f7",
  "2cfb0836-d576-4352-be9d-ebcd480cbd0d",
  "307b62a3-ac0d-4b53-bbf8-99102a363c83",
  "343a3577-6242-4e70-81fd-795aa3b82041",
  "39e70626-cee7-480a-bd0b-52568a3d341f",
  "3bf38563-c915-4f98-8d87-822179598916",
  "3d425681-b0f7-4bc4-baef-32b2530912f7",
  "43086f94-7470-4e05-9785-c4e347b613a4",
  "43dd9693-b506-4e71-b828-0598b01be5b9",
  "4cf05a41-b2c5-4c70-b5af-eb52635dc461",
  "4de6ce2a-e970-432c-a020-9d5d6e97e0c6",
  "5046c4b0-466d-416d-99ba-e67db7ae31ed",
  "5b7b4471-80e8-4f40-9f1c-193f8e1de708",
  "5cefd7eb-d7fa-4b3e-901e-82f6f861cdca",
  "5f98fb4b-b097-4f13-b04d-9b057a956fcc",
  "62442974-1787-46b4-abb0-e82bd76ea47e",
  "6580b58c-54f4-4b9a-8237-14b57bc3b64a",
  "67d93a17-7591-453a-8fff-2bf0e4e94918",
  "68d237ed-be55-42a1-a6dd-abaf98bd76d5",
  "6a0d9b57-a1c6-4d35-a275-69266bd8ce12",
  "6a146dd0-fa09-4e6a-b593-5ac8996c066c",
  "6b7b2a94-356d-42aa-9eab-0e2d196cd7cf",
  "6f1556e3-2ca1-4e6a-9cbf-d2adcd0c9b14",
  "6f493490-318c-4b1f-90be-c89fb998a979",
  "720a5636-242b-443a-bb5f-dd11c7ec3ed7",
  "73cfa6d4-7545-4a05-a9ff-af6bb99fd7d3",
  "73e958d5-de7b-4976-a2cb-bf2b7e0c39e9",
  "771e18f1-fd8b-4c65-8b41-5db35248d8db",
  "7f9ab7a4-f44a-4317-bbe9-e5bfc76762a4",
  "81e61657-6924-4b88-88b7-0830fb8a645f",
  "84610a09-9f40-4330-b7ff-83622b942e3c",
  "94058c3d-3850-47fc-9aaf-6fabd153c128",
  "a0e83858-292a-4744-863f-c5c10ae41f73",
  "a85ef38e-b8ac-4908-9409-fe04a3935706",
  "a88ab521-ab59-4fff-836d-2ceaf57aff42",
  "a898bd1d-6394-4070-a6ce-c238ba9bc985",
  "ac153da8-fcc3-49fd-a0b8-c82e95dc46c5",
  "af8b0eaf-f301-435b-a021-0a5dbe69917e",
  "b0c490d5-b845-4cc7-9e2b-9015695ba642",
  "b2491d6e-ba94-43b0-b385-d0933ddd271b",
  "b44af070-b6b0-4c6c-b007-313687e431d0",
  "c0ba5025-9a08-44f5-809e-0bf20b135570",
  "c1644dca-e8fb-4c2e-998c-e92d9c51a658",
  "c23eb36a-27e7-47c3-befc-6387225ea5cd",
  "c3a9ff30-f3c2-496f-b70f-075d5b01c5e0",
  "c5f5c8d7-e6da-4867-97f1-422a9dae1e77",
  "cd4b785b-873c-4290-9da6-4c3bf3183750",
  "ce30d68f-91a2-4139-a774-8a53fb23d1be",
  "d09988ae-ff02-402f-8c21-a7f9ec68610b",
  "d09ccf28-1dc0-4182-abb0-b07ac8b194e4",
  "d1ce0a14-c998-4129-8e84-69f45ec1695e",
  "d21d7aad-2779-429d-b014-6bf69568cbe8",
  "d341a8f4-b5a6-409b-ad55-269e1f74fd59",
  "d785bcf3-4d4a-47a2-8e3c-5e1fac7d1400",
  "d78b0207-05bf-49dc-bd5e-ef07c7b0ed9a",
  "dc11803b-b937-4dad-8ff6-173adedf1187",
  "e2bb181d-ec21-4eae-a69e-f8cd55e2a314",
  "e2f6599a-c41d-4b7b-b4de-a9c4fc2d40f4",
  "e494674a-c7a9-48d7-9680-45505fd65c28",
  "ea97cbc1-521a-4be0-8370-60f7f39ea3fc",
  "f0d10ca1-b9ba-44ea-9c96-634d37bca356",
  "f54fa5ac-6fbd-45d1-83a9-c4fd6ca158ef",
  "f6404455-9b14-4050-b62a-bdc58ed4bffa",
  "fd54c357-739a-43bd-8f41-8136e0f866e6",
  "fec731a2-1768-4215-9a0d-ba321062f8e4",
]);

// Returns a URL that can actually be loaded, or "" when there is none.
export function resolveImage(url: string | null | undefined): string {
  if (!url || url === "null") return "";
  if (url.startsWith(DEAD_PREFIX)) {
    const id = url.slice(DEAD_PREFIX.length).replace(/\.[^.]+$/, "");
    return LOCAL_IDS.has(id) ? `/game-images/${id}.png` : "";
  }
  return url.startsWith("http://") || url.startsWith("https://") ? url : "";
}

// Same, as an absolute URL for metadata and structured data.
export function resolveImageAbsolute(url: string | null | undefined): string {
  const resolved = resolveImage(url);
  return resolved.startsWith("/") ? `${SITE_URL}${resolved}` : resolved;
}
