import sequelize from "./config/sequelize.config.js";
import bcrypt from "bcrypt";
import { User } from "./models/user.model.js";
import { Topic } from "./models/topic.model.js";
import { Genre } from "./models/genre.model.js";
import { Story } from "./models/story.model.js";
import { Chapter } from "./models/chapter.model.js";
import { slugify } from "./utils/index.js";
// 3 users
const insertUsers = async () => {
  try {
    const users = [
      {
        username: "vietnt",
        password: "vietnt",
        fullName: "Nguyễn Thanh Việt",
        dob: new Date("1990-05-10"),
        role: "user",
        email: "po@example.com",
        phoneNumber: "0123456789",
        avatar: "https://i.pinimg.com/736x/a7/8b/18/a78b189b79e52db7af2beb1377fcafbd.jpg",
        backgroundImage: "https://tophinhanh.net/wp-content/uploads/2024/02/hinh-nen-may-tinh-4k-12.jpg",
        spiritStones: 50,
      },
      {
        username: "tigress_mighty",
        password: "securePass456",
        fullName: "Master Tigress",
        dob: new Date("1988-11-02"),
        role: "admin",
        email: "tigress@example.com",
        phoneNumber: "0987654321",
        avatar: "https://example.com/avatars/tigress.jpg",
        backgroundImage: null,
        spiritStones: 120,
      },
      {
        username: "monkey_king",
        password: "strongest789",
        fullName: "Monkey",
        dob: new Date("1992-07-25"),
        role: "moderator",
        email: "monkey@example.com",
        phoneNumber: null,
        avatar: null,
        backgroundImage: null,
        spiritStones: 75,
      }
    ];
    
    // Hash passwords
    for (const user of users) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    // Insert data
    await User.bulkCreate(users);
    console.log("3 users inserted successfully!");
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

export const insertStories = async () => {
  try {
    const stories = [
      {
        title: 'Chuyến phiêu lưu vào vũ trụ',
        description: 'Một câu chuyện khoa học viễn tưởng về chuyến đi vũ trụ.',
        image: 'https://cdn2.inovel12.com/story/3172021659_420%20(1).jpg',
        authorId: 1,
        type: 'original',
        topicId: 1,
        genreId: 1,
        rating: 4.5,
        status: 'published',
        views: 100,
        likes: 50,
        dislikes: 5,
        finished: true,
      },
      {
        title: 'Cuộc chiến cuối cùng',
        description: 'Một câu chuyện hành động về cuộc chiến của những người anh hùng.',
        image: 'https://cdn2.inovel12.com/story/3172021659_420%20(1).jpg',
        authorId: 1,
        type: 'original',
        topicId: 2,
        genreId: 2,
        rating: 4.8,
        status: 'published',
        views: 150,
        likes: 70,
        dislikes: 2,
        finished: true,
      },
      {
        title: 'Mối tình đầu',
        description: 'Một câu chuyện lãng mạn về tình yêu giữa hai bạn trẻ.',
        image: 'https://cdn2.inovel12.com/story/3172021659_420%20(1).jpg',
        authorId: 1,
        type: 'original',
        topicId: 3,
        genreId: 3,
        rating: 4.2,
        status: 'published',
        views: 80,
        likes: 40,
        dislikes: 3,
        finished: true,
      },
      {
        title: 'Tìm kiếm sự thật',
        description: 'Một câu chuyện trinh thám về việc tìm ra kẻ đứng sau những vụ án.',
        image: 'https://cdn2.inovel12.com/story/3172021659_420%20(1).jpg',
        authorId: 1,
        type: 'original',
        topicId: 4,
        genreId: 4,
        rating: 4.7,
        status: 'published',
        views: 120,
        likes: 60,
        dislikes: 4,
        finished: true,
      },
      {
        title: 'Khám phá biển cả',
        description: 'Một câu chuyện phiêu lưu về chuyến khám phá đại dương sâu thẳm.',
        image: 'https://cdn2.inovel12.com/story/3172021659_420%20(1).jpg',
        authorId: 2,
        type: 'original',
        topicId: 5,
        genreId: 5,
        rating: 4.3,
        status: 'published',
        views: 90,
        likes: 45,
        dislikes: 6,
        finished: true,
      },
    ];

    // Gán slug cho từng truyện
    const storiesWithSlug = stories.map((story) => ({
      ...story,
      slug: slugify(story.title),
    }));

    await Story.bulkCreate(storiesWithSlug);
    console.log("Stories inserted successfully!");
  } catch (error) {
    console.error("Error inserting stories:", error);
  }
};


const insertChapters = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối thành công.");

    const chapters = [];

    // Duyệt qua 5 truyện
    for (let storyId = 1; storyId <= 5; storyId++) {
      // Tạo 15 chương cho mỗi truyện
      for (let i = 1; i <= 15; i++) {
        chapters.push({
          chapterNumber: i,
          title: `Chương ${i}`,
          content: `Nội dung chương ${i} của truyện ${storyId}. Đây là một đoạn văn mẫu để làm nội dung truyện.`,
          storyId,
          status: "published",
          views: Math.floor(Math.random() * 100),
          likes: Math.floor(Math.random() * 50),
          dislikes: Math.floor(Math.random() * 10),
        });
      }
    }

    const chapterWithSlug = chapters.map((chapter) => ({
      ...chapter,
      slug: slugify(chapter.title),
    }));

    await Chapter.bulkCreate(chapterWithSlug);
    console.log("Thêm chương thành công!");
  } catch (error) {
    console.error("Lỗi khi thêm chương:", error);
  } finally {
    await sequelize.close();
  }
};

const insertData = async () => {
  await insertUsers();
  await insertTopics();
  await insertGenres();
  // await insertStories();
  // await insertChapters();
};

await insertData();