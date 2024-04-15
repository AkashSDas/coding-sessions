import asyncio


async def my_coroutine():
    print("Starting coroutine")
    await asyncio.sleep(1)
    print("Coroutine completed")


# Running an asynchronous function
asyncio.run(my_coroutine())


async def task1():
    await asyncio.sleep(1)
    print("Task 1 completed")


async def task2():
    await asyncio.sleep(1)
    print("Task 2 completed")


async def main():
    await asyncio.gather(task1(), task2())


asyncio.run(main())
