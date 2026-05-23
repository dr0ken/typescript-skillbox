class Stack<T> {
  private items: T[] = [];
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
  size(): number { return this.items.length; }
}

class HanoiTower<T> {

  private peg1: Stack<T>;
  private peg2: Stack<T>;
  private peg3: Stack<T>;

  constructor(p1: string = 'First', p2: string = 'Second', p3: string = 'Third') {
    this.peg1 = new Stack<T>(p1);
    this.peg2 = new Stack<T>(p2);
    this.peg3 = new Stack<T>(p3);
  }

  addDisks(disks: T[]): void {

    while (this.peg1.size() > 0) this.peg1.pop();
    
    for (const disk of disks) {
      this.peg1.push(disk);
    }
  }

  solve(): void {
    const totalDisks = this.peg1.size();
    this.move(totalDisks, this.peg1, this.peg2, this.peg3);
  }

  private move(
    n: number, 
    fromPeg: Stack<T>, 
    toPeg: Stack<T>, 
    auxPeg: Stack<T>
  ): void {
    if (n === 0) return;

    this.move(n - 1, fromPeg, auxPeg, toPeg);

    const disk = fromPeg.pop();
    if (disk !== undefined) {
      toPeg.push(disk);
      console.log(`Переместить диск ${disk} с ${fromPeg.name} на ${toPeg.name}`);
    }

    this.move(n - 1, auxPeg, toPeg, fromPeg);
  }
}

// const hanoiNumber = new HanoiTower();
// hanoiNumber.addDisks([3, 2, 1]);
// hanoiNumber.solve();

// const hanoiString = new HanoiTower('A', 'C', 'B');
// hanoiString.addDisks(["C", "B", "A"]);
// hanoiString.solve();