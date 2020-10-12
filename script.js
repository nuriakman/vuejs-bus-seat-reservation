var sharedEvents = new Vue();
var app = new Vue({
  el: "#app",
  data: {
    errors: [],
    o: [],
    selectedSeat: null,
    rows: 5,
    cols: 12,
    seats: [],
  },
  computed: {},
  methods: {
    getSeat(r, c) {
      for (i = 0; i < this.seats.length; ++i) {
        if (this.seats[i].position.r == r && this.seats[i].position.c == c) {
          return this.seats[i];
        }
      }
      return null;
    },
    generateSeats() {
      for (y = 1; y <= this.rows; ++y) {
        for (x = 1; x <= this.cols; ++x) {
          if (!this.isAisle(y, x)) {
            this.seats.push({
              position: { r: y, c: x },
              status: "RA",
            });
          }
        }
      }
    },
    classifier(r, c) {
      let seat = this.getSeat(r, c);
      if (seat != null) {
        if (this.selectedSeat != seat) {
          switch (seat.status) {
            case "RA":
              return "cls-ra";
            case "RB":
              return "cls-rb";
            case "FA":
              return "cls-fa";
            case "FB":
              return "cls-fb";
            case "MA":
              return "cls-ma";
            case "MB":
              return "cls-mb";
            default:
              return "cls-ra";
          }
        } else {
          return "cls-selected";
        }
      }
    },
    isAisle(r, c) {
      if (r == 3) {
        if (c >= 1 && c <= 11) {
          return true;
        }
      }
      return false;
    },
    onSeatSelected(r, c) {
      if (this.selectedSeat == this.getSeat(r, c)) {
        this.selectedSeat = null;
      } else {
        this.selectedSeat = this.getSeat(r, c);
      }
    },
    seatStatus(status) {
      if (this.selectedSeat != null) {
        if (this.selectedSeat.status == status) return "active";
      }
      return "";
    },
    changeSeatStatus(status) {
      if (this.selectedSeat != null) {
        for (i = 0; i < this.seats.length; ++i) {
          if (this.seats[i].position.r == this.selectedSeat.position.r && this.seats[i].position.c == this.selectedSeat.position.c) {
            this.seats[i].status = status;
            this.selectedSeat = null;
            break;
          }
        }
      }
    },
  },
  beforeMount() {},
  mounted() {
    this.generateSeats();
  },
});
