const detailsSchema = new mongoose.Schema({
  userName: String,
  date: { type: Date, default: Date.now },
});
