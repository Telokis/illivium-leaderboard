from hyperopt import hp, fmin, tpe, Trials, STATUS_OK
import os
from concurrent.futures import ThreadPoolExecutor
from tqdm import tqdm

def affixes_for_level(level):
    """
    Returns the number of affixes for a given dungeon level.
    :param level: The level of the dungeon.
    :return: The number of affixes for the given dungeon level.
    """
    if level >= 10:
        return 3
    elif level >= 5:
        return 2
    else:
        return 1

def get_score_offset(key_time, reference_time):
    """
    Returns the score offset for a given key time and reference time.
    :param key_time: The time it took to complete the dungeon in seconds.
    :param reference_time: The time it took to complete the dungeon at the next level in seconds.
    :return: The score offset for the given key time and reference time.
    """
    max_bonus_time = reference_time * 0.4
    beat_timer_by = reference_time - key_time
    bonus = beat_timer_by / max_bonus_time

    return min(1, max(-1, bonus)) + (-1 if key_time > reference_time else 0)

def compute_score_test(key_level, key_time, reference_time, high_key_threshold, base_score, scaling1, scaling2, scaling3):
    """
    Computes a score based on various parameters.
    :param key_level: Dungeon level of the key.
    :param key_time: Time taken to complete the dungeon.
    :param reference_time: Reference time for the next level dungeon.
    :param high_key_threshold: Threshold for additional score due to high level.
    :param base_score: Base score.
    :param scaling1: Scaling factor for adjusted key level.
    :param scaling2: Scaling factor for high key bonus.
    :param scaling3: Scaling factor for number of affixes.
    :return: Calculated score.
    """
    if key_level < 2 or key_time >= reference_time * 1.4:
        return 0

    score_offset = get_score_offset(key_time, reference_time)
    adjusted_key_level = key_level + score_offset
    high_key_bonus = max(0, key_level - high_key_threshold)
    n_affixes = affixes_for_level(key_level)

    return base_score + adjusted_key_level * scaling1 + high_key_bonus * scaling2 + n_affixes * scaling3

####################################################################
# Hyperparameter optimization code
####################################################################

# Data points
data_points = [
    (7, 28 * 60 + 51, 35 * 60, 141.2),
    (3, 25 * 60 + 27, 35 * 60, 104.4),
    (6, 29 * 60 + 14, 35 * 60, 134.1),
    (2, 20 * 60 + 18, 35 * 60, 99),
    (7, 34 * 60 + 53, 37 * 60 + 30, 139.9),
    (2, 27 * 60 + 51, 37 * 60 + 30, 97.2),
    (7, 27 * 60 + 27, 32 * 60, 140.8),
    (7, 23 * 60 + 5, 32 * 60, 142.5),
    (4, 24 * 60 + 16, 32 * 60, 111.0),
    (6, 27 * 60 + 34, 32 * 60, 133.7),
    (7, 32 * 60 + 0, 32 * 60, 139.0),
    (3, 21 * 60 + 58, 32 * 60, 104.9),

    (5, 26 * 60 + 28, 35 * 60, 128.0),
    (3, 25 * 60 + 27, 35 * 60, 104.4),
    (6, 38 * 60 + 28, 35 * 60, 125.8),

    (6, 33 * 60 + 46, 35 * 60, 132.4),
    
    (6, 33 * 60 + 46, 35 * 60, 132.4),
    (7, 32 * 60 + 40, 35 * 60, 139.8),
    (7, 23 * 60 + 41, 35 * 60, 143.0),
    (5, 29 * 60 + 48, 35 * 60, 126.9),
    (2, 23 * 60 + 27, 35 * 60, 98.1),
    (7, 40 * 60 + 46, 35 * 60, 131.9),
    (3, 25 * 60 + 41, 35 * 60, 104.3),

    (8, 36 * 60 + 48, 37 * 60 + 30, 146.2),
    (6, 27 * 60 + 33, 37 * 60 + 30, 135.3),
    (3, 34 * 60 + 23, 37 * 60 + 30, 102.0),
    (7, 24 * 60 + 41, 37 * 60 + 30, 143.3),
    (3, 25 * 60 + 40, 37 * 60 + 30, 104.9),
    (4, 28 * 60 + 50, 37 * 60 + 30, 110.9),
    (3, 24 * 60 + 44, 37 * 60 + 30, 105.3),
    (5, 34 * 60 + 3, 37 * 60 + 30, 126.2),

    (9, 34 * 60 + 55, 37 * 60 + 30, 153.9),
    (7, 39 * 60 + 7, 37 * 60 + 30, 133.5),
    (5, 20 * 60 + 59, 37 * 60 + 30, 130.0),
    (6, 22 * 60 + 34, 37 * 60 + 30, 137.0),
    (6, 36 * 60 + 58, 37 * 60 + 30, 132.2),
    (4, 31 * 60 + 52, 37 * 60 + 30, 109.9),

    (6, 30 * 60 + 6, 35 * 60, 133.8),
    (9, 32 * 60 + 47, 35 * 60, 153.8),
    (2, 26 * 60 + 7, 35 * 60, 97.2),
    (7, 26 * 60 + 2, 35 * 60, 142.2),
    (7, 29 * 60 + 7, 35 * 60, 141.1),
    (4, 29 * 60 + 24, 35 * 60, 110.0),

]

# def objective(params):
#     high_key_threshold, base_score, scaling1, scaling2, scaling3 = int(params['high_key_threshold']), int(params['base_score']), int(params['scaling1']), int(params['scaling2']), int(params['scaling3'])
#     total_loss = 0
#     penalty_factor = 1000  # Large penalty factor for deviations greater than 1

#     for key_level, key_time, reference_time, actual_output in data_points:
#         predicted_score = compute_score_test(key_level, key_time, reference_time, high_key_threshold, base_score, scaling1, scaling2, scaling3)
#         diff = abs(predicted_score - actual_output)
#         if diff > 2:
#             total_loss += (diff ** 2) * penalty_factor
#         else:
#             total_loss += diff ** 2  # Squared error loss

#     return {'loss': total_loss, 'status': STATUS_OK}

# space = {
#     'high_key_threshold': hp.quniform('high_key_threshold', 0, 10, 1),
#     'base_score': hp.quniform('base_score', 0, 200, 1),
#     'scaling1': hp.quniform('scaling1', 0, 20, 1),
#     'scaling2': hp.quniform('scaling2', 0, 20, 1),
#     'scaling3': hp.quniform('scaling3', 0, 20, 1)
# }

# trials = Trials()
# best = fmin(
#     fn=objective,
#     space=space,
#     algo=tpe.suggest,
#     max_evals=5000,
#     trials=trials
# )

# print("Best found parameters:", best)


def evaluate_parameters_by_scaling3(s3, data_points, progress_prefix):
    best_loss = float('inf')
    best_params = None
    high_key_threshold_range = range(0, 11)
    base_score_range = range(0, 201)
    scaling1_range = range(0, 21)
    scaling2_range = range(0, 21)

    # Create a progress bar for each thread
    with tqdm(total=len(high_key_threshold_range) * len(base_score_range) * len(scaling1_range) * len(scaling2_range),
              desc=f'{progress_prefix} Scaling3={s3}') as pbar:
        for hkt in high_key_threshold_range:
            for bs in base_score_range:
                for s1 in scaling1_range:
                    for s2 in scaling2_range:
                        total_loss = 0
                        for key_level, key_time, reference_time, actual_output in data_points:
                            predicted_score = compute_score_test(
                                key_level, key_time, reference_time,
                                hkt, bs, s1, s2, s3
                            )
                            total_loss += (predicted_score - actual_output) ** 2

                        if total_loss < best_loss:
                            best_loss = total_loss
                            best_params = (hkt, bs, s1, s2, s3)
                        pbar.update(1)
    return best_loss, best_params

def exhaustive_search(data_points):
    scaling3_range = range(0, 21)
    num_cores = os.cpu_count()

    with ThreadPoolExecutor(max_workers=num_cores) as executor:
        # Futures list
        futures = []
        for i, s3 in enumerate(scaling3_range):
            # Start a new thread for each value of scaling3
            future = executor.submit(evaluate_parameters_by_scaling3, s3, data_points, f'Thread {i+1}')
            futures.append(future)

        # Retrieve results from threads
        results = [future.result() for future in futures]

    # Find the best parameters from all threads
    best_loss = float('inf')
    best_params = None
    for loss, params in results:
        if loss < best_loss:
            best_loss = loss
            best_params = params

    return best_params, best_loss

best_params, best_loss = exhaustive_search(data_points)
print("Best Parameters:", best_params)
print("Best Loss:", best_loss)