import sequelize from "./config/sequelize.config.js";
import bcrypt from "bcrypt";
import { User } from "./models/user.model.js";
import { Topic } from "./models/topic.model.js";
import { Genre } from "./models/genre.model.js";
import { Story } from "./models/story.model.js";
import { Chapter } from "./models/chapter.model.js";
import { slugify } from "./utils/index.js";
// 3 users

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const randomPhone = () => {
  return "0" + Math.floor(100000000 + Math.random() * 900000000).toString();
};


const insertUsers = async () => {
  try {
    const users = [
      {
        username: "andanh",
        password: "andanh",
        fullName: "Ẩn danh",
        dob: new Date("1990-10-10"),
        role: "user",
        email: "andanh@gmail.com",
        phoneNumber: "0123456789",
        avatar: "https://i.pinimg.com/736x/a7/8b/18/a78b189b79e52db7af2beb1377fcafbd.jpg",
        backgroundImage: "https://tophinhanh.net/wp-content/uploads/2024/02/hinh-nen-may-tinh-4k-12.jpg",
        spiritStones: 0,
      },
      {
        username: "admin",
        password: "Quangminhnguyen041202",
        fullName: "Nguyễn Thanh Việt",
        dob: new Date("1990-05-10"),
        role: "admin",
        email: "medegany45@gmail.com",
        phoneNumber: "0123456789",
        avatar: "https://i.pinimg.com/736x/a7/8b/18/a78b189b79e52db7af2beb1377fcafbd.jpg",
        backgroundImage: "https://tophinhanh.net/wp-content/uploads/2024/02/hinh-nen-may-tinh-4k-12.jpg",
        spiritStones: 100,
      }
    ];

    // for (let i = 1; i <= 20; i++) {
    //   users.push({
    //     username: `user${i}`,
    //     password: "123456", // sẽ hash sau
    //     fullName: `Người dùng ${i}`,
    //     dob: randomDate(new Date(1980, 0, 1), new Date(2005, 0, 1)),
    //     role: "user",
    //     email: `user${i}@gmail.com`,
    //     phoneNumber: randomPhone(),
    //     avatar: "https://i.pinimg.com/736x/a7/8b/18/a78b189b79e52db7af2beb1377fcafbd.jpg",
    //     backgroundImage: "https://tophinhanh.net/wp-content/uploads/2024/02/hinh-nen-may-tinh-4k-12.jpg",
    //     spiritStones: Math.floor(Math.random() * 200),
    //   });
    // }

    // Hash passwords
    for (const user of users) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    // Insert data
    await User.bulkCreate(users);
    console.log("admin inserted successfully!");
  } catch (error) {
    console.error("Error inserting users:", error);
  }
};

const insertTopics = async () => {
  try {
    const topics = [
      { name: 'Khoa học viễn tưởng' },
      { name: 'Hành động' },
      { name: 'Lãng mạn' },
      { name: 'Kinh dị' },
      { name: 'Phiêu lưu' },
      { name: 'Tình cảm' },
      { name: 'Thám hiểm' },
      { name: 'Chính trị' },
      { name: 'Lịch sử' },
      { name: 'Tâm lý' },
    ]
    await Topic.bulkCreate(topics);
    console.log("Topics inserted successfully!");
  } catch (error) {
    console.error("Error inserting topics:", error);
  }
};

const insertGenres = async () => {
  try {
    const genres = [
      { name: 'Khoa học viễn tưởng' },
      { name: 'Hành động' },
      { name: 'Lãng mạn' },
      { name: 'Kinh dị' },
      { name: 'Phiêu lưu' },
      { name: 'Tình cảm' },
      { name: 'Thể thao' },
      { name: 'Trinh thám' },
      { name: 'Hài hước' },
      { name: 'Tâm lý' },
    ]
    await Genre.bulkCreate(genres);
    console.log("Genres inserted successfully!");
  } catch (error) {
    console.error("Error inserting genres:", error);
  }
};

const insertStories = async () => {
  try {
    // Lấy danh sách 20 user
    const users = await User.findAll({ limit: 20 });

    if (users.length === 0) {
      console.log("⚠️ Không tìm thấy user nào trong database!");
      return;
    }

    const stories = [];
    let counter = 1;

    for (const user of users) {
      for (let i = 0; i < 2; i++) { // mỗi user 2 story
        const title = `Câu chuyện số ${counter}`;
        stories.push({
          title,
          slug: slugify(title),
          description: `Đây là phần mô tả cho ${title}.`,
          image: "https://placehold.co/600x400", // ảnh mẫu
          authorName: user.fullName || user.username,
          authorId: user.id,
          type: Math.random() > 0.5 ? "original" : "translated",
          releaseSchedule: "Hàng tuần",
          timeline: "Hiện đại",
          ending: "Chưa kết thúc",
          is18Plus: Math.random() > 0.8, // ~20% 18+
          star: Math.floor(Math.random() * 500),
          status: "active",
          views: Math.floor(Math.random() * 10000),
          rating: Math.floor(Math.random() * 500),
          followers: Math.floor(Math.random() * 2000),
          likes: Math.floor(Math.random() * 1000),
          dislikes: Math.floor(Math.random() * 50),
          finished: Math.random() > 0.7, // ~30% đã hoàn thành
          lastUpdate: new Date(),
          isLock: false,
          price: Math.floor(Math.random() * 100),
        });
        counter++;
      }
    }

    // Insert 40 story
    await Story.bulkCreate(stories);
    console.log("✅ 40 stories inserted successfully!");
  } catch (error) {
    console.error("❌ Error inserting stories:", error);
  }
};

const insertChapters = async () => {
  try {
    // Lấy toàn bộ 40 story đã insert trước đó
    const stories = await Story.findAll({ limit: 40 });

    if (stories.length === 0) {
      console.log("⚠️ Không tìm thấy story nào trong database!");
      return;
    }

    const chapters = [];

    for (const story of stories) {
      for (let i = 1; i <= 3; i++) {
        const title = `Chương ${i} của ${story.title}`;
        chapters.push({
          chapterNumber: i,
          title,
          slug: slugify(title),
          content: `Nội dung của ${title}. Đây chỉ là văn bản mô tả mẫu.`,
          storyId: story.id,
          status: "published",
          views: Math.floor(Math.random() * 5000),
          likes: Math.floor(Math.random() * 500),
          dislikes: Math.floor(Math.random() * 50),
        });
      }
    }

    // Insert 120 chapter
    await Chapter.bulkCreate(chapters);
    console.log("✅ 3 chapters cho mỗi story (tổng 120) đã được insert thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi insert chapters:", error);
  }
};

const insertMoreChapters = async () => {
  try {
    // Lấy toàn bộ 40 story
    const stories = await Story.findAll({ limit: 40 });

    if (stories.length === 0) {
      console.log("⚠️ Không tìm thấy story nào trong database!");
      return;
    }

    const chapters = [];

    for (const story of stories) {
      for (let i = 4; i <= 8; i++) {
        const title = `Chương ${i} của ${story.title}`;
        chapters.push({
          chapterNumber: i,
          title,
          slug: slugify(title),
          content: `Nội dung của ${title}. Đây là nội dung demo để test dữ liệu.`,
          storyId: story.id,
          status: "published",
          views: Math.floor(Math.random() * 10000),
          likes: Math.floor(Math.random() * 1000),
          dislikes: Math.floor(Math.random() * 100),
        });
      }
    }

    // Insert 200 chương (5 chương × 40 truyện)
    await Chapter.bulkCreate(chapters);
    console.log("✅ Đã insert thêm 5 chương (Chương 4 → 8) cho mỗi story!");
  } catch (error) {
    console.error("❌ Lỗi khi insert thêm chapters:", error);
  }
};

const insertData = async () => {
  await insertUsers();
  await insertTopics();
  await insertGenres();
  // await insertStories();
  // await insertChapters();
  // await insertMoreChapters();
};

await insertData();