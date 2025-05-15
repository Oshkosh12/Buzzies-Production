<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>BUZZIEZ</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"></script>
  <style>
    body {
      margin: 0;
      background-color: #ea6d5d;
      font-family: 'Buzziez';
      overflow: hidden;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      border-bottom: 2px solid #1b00b2;
    }

    .logo {
      color: #1b00b2;
      font-size: 1.5rem;
      font-weight: bold;
    }

    nav a {
      border: 1px solid #1b00b2;
      padding: 0.5rem 1rem;
      margin-left: 0.5rem;
      text-decoration: none;
      color: #1b00b2;
      font-size: 0.9rem;
    }

    .hero {
      text-align: center;
      margin-top: 8vh;
    }

    .hero h1 {
      font-size: 6rem;
      color: #1b00b2;
      letter-spacing: 5px;
    }

    .hero button {
      margin-top: 2rem;
      padding: 1rem 2rem;
      border: 1px solid #1b00b2;
      background: transparent;
      color: #1b00b2;
      font-size: 1.2rem;
      cursor: pointer;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: -1;
    }
  </style>
</head>
<body>

  <header>
    <div class="logo">BUZZIEZ</div>
    <nav>
      <a href="#">Map</a>
      <a href="#">Online</a>
      <a href="#">Kit</a>
      <a href="#">Why</a>
      <a href="#">Submit</a>
    </nav>
  </header>

  <div class="hero">
    <h1>BUZZIEZ</h1>
    <button id="startButton">Let's go!</button>
  </div>

  <canvas id="world"></canvas>

  <script>
    const { Engine, Render, World, Bodies, Runner } = Matter;

    const engine = Engine.create();
    const world = engine.world;

    const canvas = document.getElementById("world");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: 'transparent',
        wireframes: false,
      }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    let cupCount = 0;
    const maxCups = 20;

    const startCups = () => {
      const interval = setInterval(() => {
        if (cupCount >= maxCups) {
          clearInterval(interval);
          return;
        }

        const side = cupCount % 2 === 0 ? 100 : window.innerWidth - 100;
        const size = 50;

        const cup = Bodies.rectangle(side, -100, size, size, {
          render: {
            sprite: {
              texture: 'https://dimgrey-bat-936335.hostingersite.com/assets/images/AdobeStock_281545854-scaled-removebg-preview.png', // <- Replace with your actual image path
              xScale: 0.3,
              yScale: 0.3
            }
          },
          friction: 0.001,
          restitution: 0.4
        });

        World.add(world, cup);
        cupCount++;
      }, 1000);
    };

    document.getElementById("startButton").addEventListener("click", startCups);

    // Clean up offscreen cups
    Matter.Events.on(engine, "afterUpdate", () => {
      world.bodies.forEach(body => {
        if (body.position.y > window.innerHeight + 200) {
          World.remove(world, body);
        }
      });
    });

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
    });
    
    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, {
  isStatic: true
});
World.add(world, ground);

  </script>

</body>
</html>