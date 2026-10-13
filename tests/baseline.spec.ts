import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("mobile home renders categories and dense service navigation without runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (
      /^https?:/.test(request.url()) &&
      !request.url().startsWith("http://127.0.0.1:5173/")
    )
      external.push(request.url());
  });
  await page.reload();
  await expect(
    page.getByRole("link", { name: "음식배달", exact: false }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "한식 카테고리", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "하단 내비게이션" }).getByRole("link"),
  ).toHaveCount(5);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
  await page.screenshot({ path: "artifacts/baseline-home-mobile.png" });
});

test("all five bottom navigation tabs switch and retain selected state", async ({
  page,
}) => {
  const navigation = page.getByRole("navigation", { name: "하단 내비게이션" });
  for (const [label, path] of [
    ["검색", "/search"],
    ["찜", "/favorites"],
    ["주문내역", "/orders"],
    ["마이배민", "/my"],
    ["홈", "/"],
  ] as const) {
    await navigation.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${path}$`));
    await expect(
      navigation.getByRole("link", { name: label, exact: true }),
    ).toHaveAttribute("aria-current", "page");
  }
});

test("category, restaurant, menu tabs and back navigation work", async ({
  page,
}) => {
  await page.getByRole("link", { name: "치킨 카테고리", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "치킨", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation").getByRole("link", { name: "홈", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page
    .getByRole("link", { name: "바삭한 치킨 역삼점 가게 보기", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "바삭한 치킨 역삼점", exact: true }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "정보", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "영업 정보", exact: true }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "리뷰", exact: false }).click();
  await expect(
    page.getByText("음식이 따뜻하게 도착했어요.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "메뉴", exact: true }).click();
  await page.getByRole("button", { name: "사이드", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "치즈볼 5개 선택", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "뒤로가기", exact: true }).click();
  await expect(page).toHaveURL(/#\/category\/chicken$/);
});

test("search input, results, recent searches and empty state work", async ({
  page,
}) => {
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "검색", exact: true })
    .click();
  const input = page.getByRole("textbox", { name: "음식이나 가게 검색" });
  await input.fill("치킨");
  await input.press("Enter");
  await expect(
    page.getByRole("link", {
      name: "바삭한 치킨 역삼점 가게 보기",
      exact: true,
    }),
  ).toBeVisible();
  await input.fill("없는가게12345");
  await page.getByRole("button", { name: "검색", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "검색 결과가 없어요" }),
  ).toBeVisible();
  await page.goBack();
  await expect(input).toHaveValue("치킨");
  await page.goForward();
  await expect(input).toHaveValue("없는가게12345");
  await page.getByRole("button", { name: "검색어 지우기" }).click();
  await page
    .getByRole("button", { name: "없는가게12345 검색 기록 삭제" })
    .click();
  await expect(
    page.getByRole("button", { name: "없는가게12345 검색 기록 삭제" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "전체 삭제" }).click();
  await expect(page.getByText("최근 검색어가 없어요.")).toBeVisible();
});

test("restaurant filters and sorting change the list", async ({ page }) => {
  await page
    .getByRole("link", { name: "음식배달", exact: false })
    .first()
    .click();
  await page.getByRole("button", { name: "배달팁 무료", exact: true }).click();
  await expect(page.getByRole("link", { name: /가게 보기$/ })).toHaveCount(2);
  await page.getByRole("button", { name: "배달팁 무료", exact: true }).click();
  await page.getByRole("button", { name: "기본순", exact: false }).click();
  await page
    .getByRole("dialog", { name: "정렬" })
    .getByRole("button", { name: "가까운 순", exact: true })
    .click();
  await expect(
    page.getByRole("link", { name: /가게 보기$/ }).first(),
  ).toHaveAccessibleName("카페 오후 가게 보기");
});

test("selecting options and quantity creates a mock order with correct totals", async ({
  page,
}) => {
  await page.getByRole("link", { name: "치킨 카테고리", exact: true }).click();
  await page
    .getByRole("link", { name: "바삭한 치킨 역삼점 가게 보기", exact: true })
    .click();
  await page
    .getByRole("button", { name: "바삭 후라이드 치킨 선택", exact: true })
    .click();
  const sheet = page.getByRole("dialog", { name: "메뉴 선택" });
  await sheet.getByRole("radio", { name: /곱빼기/ }).check();
  await sheet.getByRole("button", { name: "수량 늘리기", exact: true }).click();
  await sheet
    .getByRole("button", { name: "42,000원 담기", exact: true })
    .click();
  await page.getByRole("link", { name: /장바구니 보기/ }).click();
  await expect(
    page.getByRole("heading", { name: "장바구니", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: "배달 요청사항" })
    .selectOption("문 앞에 두고 노크해주세요.");
  await page
    .getByRole("button", { name: "42,000원 주문하기", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "가게에서 맛있게 조리하고 있어요" }),
  ).toBeVisible();
  await expect(
    page.getByText("바삭 후라이드 치킨 2개", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("곱빼기", { exact: true })).toBeVisible();
  await expect(
    page.getByText("문 앞에 두고 노크해주세요.", { exact: true }),
  ).toBeVisible();
  await page.screenshot({ path: "artifacts/baseline-order-mobile.png" });
});

test("removing the last cart item returns the empty cart", async ({ page }) => {
  await page.goto("/#/restaurant/chicken-house");
  await page
    .getByRole("button", { name: "바삭 후라이드 치킨 선택", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "19,000원 담기", exact: true })
    .click();
  await page.getByRole("link", { name: /장바구니 보기/ }).click();
  await page
    .getByRole("button", { name: "바삭 후라이드 치킨 삭제", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "장바구니가 비어있어요" }),
  ).toBeVisible();
});

test("favorites change and persist without a backend", async ({ page }) => {
  await page.goto("/#/restaurant/chicken-house");
  await page.getByRole("button", { name: "찜 해제", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "가게 찜하기", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "가게 찜하기", exact: true }).click();
  await page.getByRole("button", { name: "뒤로가기", exact: true }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "찜", exact: true })
    .click();
  await expect(
    page.getByRole("link", {
      name: "바삭한 치킨 역삼점 가게 보기",
      exact: true,
    }),
  ).toBeVisible();
});

test("existing mock orders open details and support inquiry", async ({
  page,
}) => {
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "주문내역", exact: true })
    .click();
  await page
    .getByRole("link", { name: "주문상세", exact: true })
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: "주문상세", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "주문 문의", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "1:1 문의", exact: true }),
  ).toBeVisible();
});

test("my page settings toggles persist after reload", async ({ page }) => {
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "마이배민", exact: true })
    .click();
  await page.getByRole("link", { name: "환경설정", exact: true }).click();
  const notification = page.getByRole("switch", { name: "혜택·이벤트 알림" });
  await expect(notification).not.toBeChecked();
  await notification.click();
  await page.reload();
  await expect(notification).toBeChecked();
  await page.getByRole("button", { name: "뒤로가기", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "마이배민", exact: true }),
  ).toBeVisible();
});

test("customer center stays in the lower my page path and FAQ expands", async ({
  page,
}) => {
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "마이배민", exact: true })
    .click();
  const help = page.getByRole("link", { name: "고객센터", exact: true });
  await expect(help).not.toBeInViewport();
  await help.click();
  await expect(
    page.getByRole("heading", { name: "고객센터", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "자주 묻는 질문", exact: true }).click();
  await page.getByRole("button", { name: "배달", exact: true }).click();
  await page.getByRole("button", { name: /배달 예상시간이 지났어요/ }).click();
  await expect(
    page.getByText("주문내역에서 주문 상태와 예상 배달시간을 확인해 주세요.", {
      exact: false,
    }),
  ).toBeVisible();
  await page.screenshot({ path: "artifacts/baseline-help-mobile.png" });
});

test("mock inquiry is submitted locally and has a confirmation", async ({
  page,
}) => {
  await page.goto("/#/help/inquiry");
  await page
    .getByRole("combobox", { name: "문의 유형", exact: true })
    .selectOption("배달");
  await page
    .getByRole("textbox", { name: "문의 내용", exact: true })
    .fill("예시 주문의 배달 상태가 궁금합니다.");
  await page.getByRole("button", { name: "문의하기", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "문의가 접수되었어요" }),
  ).toBeVisible();
  await expect(
    page.getByText("실제 상담 접수는 진행되지 않아요.", { exact: false }),
  ).toBeVisible();
});

test("mock address selection updates the home header", async ({ page }) => {
  await page
    .getByRole("link", { name: "우리집", exact: false })
    .first()
    .click();
  await page.getByRole("button", { name: /회사 서울특별시/ }).click();
  await expect(
    page.getByRole("link", { name: "회사", exact: false }).first(),
  ).toBeVisible();
});

test("320px viewport and desktop frame stay within their boundaries", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await expect(
    page.getByRole("link", { name: "치킨 카테고리", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "artifacts/baseline-home-320.png" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  const box = await page.locator(".bm-device").boundingBox();
  expect(box?.width).toBe(390);
  expect(box?.x).toBe(525);
  await page.screenshot({ path: "artifacts/baseline-home-desktop.png" });
});
